<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Exception;

class UploadImageController extends Controller
{
    public function uploadImage(Request $request)
    {
        $image = $request->file('image');
        try {
            $path = $image->store('images', 'public');
            return response()->json(url("storage/{$path}"));
        } catch (Exception $error) {
            return response()->json(['error' => $error->getMessage()]);
        }
    }
}
