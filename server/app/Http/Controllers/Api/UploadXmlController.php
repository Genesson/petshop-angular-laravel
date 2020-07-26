<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Exception;

class UploadXmlController extends Controller
{
    public function uploadXml(Request $request)
    {
        $Xml = $request->file('xml');
        try {
            $path = $Xml->store('xmls', 'public');
            return response()->json($path);
        } catch (Exception $error) {
            return response()->json(['error' => $error->getMessage()]);
        }
    }
}
