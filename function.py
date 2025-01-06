from app import app  # Importa o aplicativo Flask

def gcp_function(request):
    return app(request)  # Retorna a aplicação Flask como resposta à requisição