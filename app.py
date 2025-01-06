# Importando as bibliotecas necessárias
from flask import Flask, request, jsonify  # Flask para criar o aplicativo web
import pandas as pd  # Pandas para manipulação de dados
from sklearn.feature_extraction.text import TfidfVectorizer  # Para transformar texto em vetor TF-IDF
from sklearn.metrics.pairwise import cosine_similarity  # Para calcular a similaridade entre vetores

# Criando uma instância do aplicativo Flask
app = Flask(__name__)

def carregar_contatos():
    """
    Esta função simula o carregamento de uma base de dados de contatos.
    Ela retorna um DataFrame do Pandas com informações fictícias de contatos.

    Retorna:
        DataFrame: Um DataFrame contendo nomes, habilidades e área de atuação dos contatos.
    """
    # Dados fictícios de contatos; considere substituir por lógica para carregar de um CSV ou banco de dados real.
    return pd.DataFrame({
        'nome': ['Mariana Costa', 'Juliana Ferreira'],  # Nomes dos contatos
        'habilidades': ['nutrição, saúde', 'psicologia, emagrecimento'],  # Habilidades dos contatos
        'area_atuacao': ['Saúde', 'Psicologia'],  # Área de atuação dos contatos
    })

@app.route('/test', methods=['GET'])
def test():
    """
    Endpoint de teste para verificar se o servidor Flask está em execução.

    Retorna:
        JSON: Mensagem confirmando que o servidor está funcionando.
    """
    return jsonify({'mensagem': 'Servidor Flask está funcionando!'}), 200

@app.route('/analisar_problema', methods=['POST'])
def analisar_problema():
    """
    Endpoint para analisar um problema e retornar contatos relevantes.

    O usuário deve enviar um JSON contendo a descrição do problema.
    Exemplo de JSON: {"problema": "preciso emagrecer"}

    Retorna:
        JSON: Uma lista de contatos relevantes para o problema analisado ou uma mensagem de erro.
    """
    # Obtendo dados do corpo da requisição
    data = request.json
    problema = data.get('problema', '')  # Obtém o problema enviado pelo usuário na requisição
    
    # Verifica se o problema foi enviado
    if not problema:
        return jsonify({'mensagem': 'Problema não fornecido.', 'status': 'erro'}), 400

    # Carregar os contatos
    contatos_df = carregar_contatos()  # Chama a função para carregar os contatos
    
    # Transformando as habilidades dos contatos e o problema em vetores numéricos
    vectorizer = TfidfVectorizer()  # Inicializa o vetorizador
    tfidf_matrix = vectorizer.fit_transform(contatos_df['habilidades'].tolist() + [problema])  # Cria a matriz TF-IDF
    
    # Calculando a similaridade do cosseno entre o problema e as habilidades dos contatos
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])  # Compara o vetor do problema com os vetores dos contatos

    # Obter os índices dos contatos mais semelhantes
    indices = cosine_sim[0].argsort()[-5:][::-1]  # Obtém os índices dos 5 contatos mais relevantes

    # Cria uma lista de resultados com as informações dos contatos encontrados
    resultados = contatos_df.iloc[indices].to_dict(orient='records')

    return jsonify(resultados), 200  # Retorna a lista de contatos como JSON

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)  # Mude para 5001 ou outra porta livre