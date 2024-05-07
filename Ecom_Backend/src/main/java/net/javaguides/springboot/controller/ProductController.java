package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.dto.ProductDto;
import net.javaguides.springboot.service.ProductService;

@CrossOrigin("*")
@RestController
public class ProductController {
    
    private ProductService productService;
    
    public ProductController(ProductService productService) {
        super();
        this.productService = productService;
    }

    // Build Add product REST API
    @PostMapping("/admin/create-product")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        ProductDto savedProduct = productService.createProduct(productDto);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
    
    // Build Get product REST API
    @GetMapping("/public/products/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") long productId) {
        ProductDto productDto = productService.getProductById(productId);
        return ResponseEntity.ok(productDto);
    }
    
    // Build Get All products REST API
    @GetMapping("/public/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    // Build Update product REST API
    @PutMapping("/admin/update-product/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") long productId, @RequestBody ProductDto updatedProduct) {
        ProductDto productDto = productService.updateProduct(productId, updatedProduct);
        return ResponseEntity.ok(productDto);
    }
    
    // Build Delete product REST API
    @DeleteMapping("/admin/delete-product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }
}
