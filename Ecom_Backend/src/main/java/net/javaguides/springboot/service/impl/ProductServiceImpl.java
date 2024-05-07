package net.javaguides.springboot.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import net.javaguides.springboot.dto.ProductDto;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.mapper.ProductMapper;
import net.javaguides.springboot.model.Product;
import net.javaguides.springboot.repository.ProductRepository;
import net.javaguides.springboot.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
    
    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        super();
        this.productRepository = productRepository;
    }

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product product = ProductMapper.mapToProduct(productDto);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Override
    public ProductDto getProductById(long productId) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with given ID: " + productId));
        return ProductMapper.mapToProductDto(product);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(ProductMapper::mapToProductDto).collect(Collectors.toList());
    }

    @Override
    public ProductDto updateProduct(long productId, ProductDto updatedProduct) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with given Id: " + productId));
        product.setName(updatedProduct.getName());
        product.setBasePrice(updatedProduct.getBasePrice());
        product.setReduction(updatedProduct.getReduction());
        product.setThreshold(updatedProduct.getThreshold());
        product.setImage(updatedProduct.getImage());
        product.setQuantity(updatedProduct.getQuantity());
        product.setDescription(updatedProduct.getDescription());
        product.setCategory(updatedProduct.getCategory());
        Product updatedProductObj = productRepository.save(product);
        return ProductMapper.mapToProductDto(updatedProductObj);
    }

    @Override
    public void deleteProduct(long productId) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with given Id: " + productId));
        productRepository.deleteById(productId);
    }
}
