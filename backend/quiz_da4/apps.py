from django.apps import AppConfig


class QuizDa4Config(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "quiz_da4"

    def ready(self):
        import quiz_da4.signals
