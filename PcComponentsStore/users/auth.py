from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password


class EmailAuthBackend(ModelBackend):
    def authenticate(self, request, username="", password="", **kwargs):
        user_model = get_user_model()
        try:
            # Ищем совпадение по email у пользовательских моделей в БД.
            # Если находим - сверяем пароли.
            user = user_model.objects.get(email__iexact=username)
            if check_password(password, user.password):
                return user
            else:
                return None
        # В случае "неуспеха" проверки ловим соответствующее
        # исключение и возвращаем отрицательный результат.
        except user_model.DoesNotExist:
            return None


# class EmailAuthBackend(ModelBackend):
#     def authenticate(self, request, username=None, password=None):
#         print('sas')
#         if '@' in username:
#             kwargs = {'email': username}
#             print('@sas')
#         else:
#             print('NEsas')
#             kwargs = {'username': username}
#
#         try:
#             user = User.objects.get(**kwargs)
#             if user.check_password(password):
#                 return user
#             else:
#                 return None
#         except User.DoesNotExist:
#             return None
#
#     def get_user(self, user_id):
#         try:
#             return User.objects.get(pk=user_id)
#         except User.DoesNotExist:
#             return None

# class EmailAuthBackend(ModelBackend):
#     # """
#     # Authenticate using e-mail account.
#     # """
#
#     print("EmailAuthBackend")
#
#     def authenticate(self, request, username=None, password=None, **kwargs):
#         print("Eee")
#         try:
#             user = User.objects.get(email=username)
#             if user.check_password(password):
#                 return user
#             return None
#         except User.DoesNotExist:
#             return None
#
#     def get_user(self, user_id):
#         try:
#             return User.objects.get(pk=user_id)
#         except User.DoesNotExist:
#             return None
