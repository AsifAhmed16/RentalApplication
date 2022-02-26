from django.urls import path

from .views import *

app_name = 'product'

urlpatterns = [
    path('', ProductListView.as_view(), name='product_list'),
    path('add/', ProductAddView.as_view(), name='product_add'),
    path('delete/<product_id>/', ProductDeleteView.as_view(), name='product_delete'),
    path('details/<product_id>/', ProductDetailsView.as_view(), name='product_details'),
    path('edit/<product_id>/', ProductUpdateView.as_view(), name='product_details'),

    path('book/cost/<product_id>/', ProductBookCostView.as_view(), name='product_book_cost'),
    path('book/<product_id>/', ProductBookView.as_view(), name='product_book'),

    path('return/cost/<product_id>/', ProductReturnCostView.as_view(), name='product_return_cost'),
    path('return/<product_id>/', ProductReturnView.as_view(), name='product_return'),
]
