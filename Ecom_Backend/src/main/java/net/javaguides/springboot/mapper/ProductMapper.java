package net.javaguides.springboot.mapper;

import net.javaguides.springboot.dto.ProductDto;
import net.javaguides.springboot.model.Product;

public class ProductMapper {
    
	public static ProductDto mapToProductDto(Product product) {
	    if (product == null) {
	        return null;
	    }
	    return new ProductDto(
	            product.getId(),
	            product.getName(),
	            product.getBasePrice(),
	            product.getReduction(),
	            product.getThreshold(),
	            product.getImage(),
	            product.getQuantity(),
	            product.getDescription(),
	            product.getCategory()
	    );
	}

    
    public static Product mapToProduct(ProductDto productDto) {
        return new Product(
                productDto.getId(),
                productDto.getName(),
                productDto.getBasePrice(),
                productDto.getReduction(),
                productDto.getThreshold(),
                productDto.getImage(),
                productDto.getQuantity(),
                productDto.getDescription(),
                productDto.getCategory()
        );
    }

}
