<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "landing-webinar".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'landing-webinar'),

    'flavors' => array (
  'landing-webinar' => 
  array (
    'label' => 'WEBINAR PINTAR — Webinar Online',
    'brand_name' => 'WEBINAR PINTAR',
    'brand_tagline' => 'Naik kelas: strategi tumbuh untuk bisnis kecil',
    'brand_initials' => 'WP',
    'accent' => '#0e7490',
    'category' => 'teknologi',
    'home' => 'landings.webinar',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Menu',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Landing',
              'to' => '/landings/webinar',
              'icon' => 'Home',
            ),
            1 => 
            array (
              'label' => 'Dashboard',
              'to' => '/dashboard',
              'icon' => 'LayoutDashboard',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
