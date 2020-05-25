from django.contrib import admin
from .models import News


# Register your models here.
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'description', 'created']
    list_filter = ['created']
    # list_editable = ['price', 'available']
    # prepopulated_fields = {'slug': ('name',)}
