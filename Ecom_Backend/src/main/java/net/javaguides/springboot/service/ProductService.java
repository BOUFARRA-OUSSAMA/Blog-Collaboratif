package net.javaguides.springboot.service;

import java.util.List;

import net.javaguides.springboot.dto.ProductDto;

public interface ProductService {
    
    ProductDto createProduct(ProductDto productDto);
    
    ProductDto getProductById(long productId);
    
    List<ProductDto> getAllProducts();
    
    ProductDto updateProduct(long productId, ProductDto updatedProduct);
    
    void deleteProduct(long productId);

}
