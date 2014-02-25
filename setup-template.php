<?php

global $wp_query;

echo $step = esc_html( $wp_query->query_vars['wp-admin/setup'] );
