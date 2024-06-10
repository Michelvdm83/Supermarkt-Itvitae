package com.java55.supermarktitvitae.shoppingcart;

import com.java55.supermarktitvitae.shoppingcartproduct.ShoppingCartProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/shoppingcarts")
@RequiredArgsConstructor
public class ShoppingCartController {
    private ShoppingCartRepository shoppingCartRepository;
    private ShoppingCartProductRepository shoppingCartProductRepository;

}
