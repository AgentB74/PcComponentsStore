from decimal import Decimal
from django.conf import settings
from goods.models import Product


class Cart(object):
    def __init__(self, request):
        # """
        # Инициализация корзины объектом request
        # """
        self.session = request.session  # сохраняем текущую сессию
        cart = self.session.get(settings.CART_SESSION_ID)  # пытаемся считать идентификатор корзины изтекущей сессии
        if not cart:  # если в текущей сессии корзины нет
            # создаем новую корзину
            cart = self.session[settings.CART_SESSION_ID] = {}  # новая корзина использует структуру словарь
        self.cart = cart

    def add(self, product, quantity=1, update_quantity=False):
        # """
        # Добавить продукт в корзину или обновить количество
        # """
        product_id = str(product.id)
        # так как данные о сессии сохраняются в формете JSON необходимо все цифровые значения конвертировать в строковые
        if product_id not in self.cart:
            self.cart[product_id] = {'quantity': 0, 'price': str(product.price)}
        if update_quantity:
            self.cart[product_id]['quantity'] = quantity
        else:
            self.cart[product_id]['quantity'] += quantity
        self.save()

    def save(self):
        # Сессию необходимо пометить как измененнуюю, чтобы она сохранилась
        self.session.modified = True

    def remove(self, product):
        # """
        # Удалить продукт из корзины
        # """
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def __iter__(self):
        # """
        # Перебрать все продукты в корзине и извлечь информацю о них из БД по ключам
        # """
        product_ids = self.cart.keys()
        # Получить объекты содержащие продукты и добавить их в корзину
        products = Product.objects.filter(id__in=product_ids)

        cart = self.cart.copy()
        for product in products:
            cart[str(product.id)]['product'] = product.id

        for item in cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']
            yield item

    def __len__(self):
        # """
        # Подсчитать количество продуктов в корзине
        # """
        return sum(item['quantity'] for item in self.cart.values())

    def get_total_price(self):
        # """
        # Подсчитать общую стоимость продуктов в корзине
        # """
        return sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values())

    def clear(self):
        # """
        # Сбросить корзину
        # """
        del self.session[settings.CART_SESSION_ID]
        self.save()
