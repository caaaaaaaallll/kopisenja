<?php

namespace App\Http\Controllers;

use App\Models\Product;
use illuminate\Http\Request;
use illuminate\View\View;
use illuminate\Http\RedirectResponse;
use illuminate\Support\Facades\Storage;
class ProductController extends Controller
{
    public function index() : View
    {
        $products = Product::latest()->paginate(10);
        return view('products.index', compact('products'));
    }
    public function create(): View
    {
        return view('products.create');
    }
    public function store (Request$request):RedirectResponse
    {
        $request->validate([
            'image' =>'required|image|mimes:jpeg,jpg,png|max:2048',
            'title' =>'required|min:5',
            'description' => 'required|min:10',
            'price' => 'required|numeric',
            'stock' => 'required|numeric'
        ]);

        $image = $request->file('image');
        $image->storeAs('products', $image->hashName());

        Product::create([
            'image' => $image->hashName(),
            'title' => $request->title,
            'description' =>$request->description,
            'price' => $request->price,
            'stock' => $request->stock
        ]);
        return redirect()->route('products.index')->with(['success' => 'Data Berhasil Disimpan']);
    }
    public function show(string $id): View{
        $product = Product ::findOrFail($id);
        return view ('products.show', compact('product'));
    }
    public function edit(string $id): View 
{ 
//get product by ID 
$product = Product::findOrFail($id); 
//render view with product 
return view('products.edit', compact('product')); 
} 
public function update(Request $request, $id): RedirectResponse 
{ 
//validate form 
$request->validate([ 
'image'         => 'image|mimes:jpeg,jpg,png|max:2048', 
'title'         => 'required|min:5', 
 'description'   => 'required|min:10', 
            'price'         => 'required|numeric', 
            'stock'         => 'required|numeric' 
        ]); 
 
        //get product by ID 
        $product = Product::findOrFail($id); 
 
        //check if image is uploaded 
        if ($request->hasFile('image')) { 
 
                  //delete old image 
            Storage::delete('products/'.$product->image); 
 
            //upload new image 
            $image = $request->file('image'); 
            $image->storeAs('products', $image->hashName()); 
 
            //update product with new image 
            $product->update([ 
                'image'         => $image->hashName(), 
                'title'         => $request->title, 
                'description'   => $request->description, 
                'price'         => $request->price, 
                'stock'         => $request->stock 
            ]); 
 
        } else { 
 
            //update product without image 
            $product->update([ 
                'title'         => $request->title, 
                'description'   => $request->description, 
                'price'         => $request->price, 
                'stock'         => $request->stock 
            ]); 
        } 
 
        //redirect to index
        return redirect()->route('products.index')->with(['success' => 
'Data Berhasil Diubah!']); 
}
public function destroy($id) : RedirectResponse
{
$product = Product :: findOrFail($id);
Storage::delete(('products/'. $product->image));
$product->delete();
return redirect()->route('products.index')->with(['success' => 'Data Berhasil Dihapus']);
}
}
