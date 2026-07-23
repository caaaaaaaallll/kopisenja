<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;


Route::resource('/product', ProductController ::class);

Route::get('/', function()  {
return view('welcome');
});
