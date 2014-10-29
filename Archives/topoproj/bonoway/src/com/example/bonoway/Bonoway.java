package com.example.bonoway;

import org.apache.cordova.DroidGap;
import android.os.Bundle;



public class Bonoway extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        super.loadUrl("file:///android_asset/www/index.html", 10000);

    }



    
}
