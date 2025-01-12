package net.javaguides.springboot.dto;

import java.math.BigDecimal;

import net.javaguides.springboot.enums.ProdCat;

public class ProductDto {
    
    private long id;
    private String name;
    private BigDecimal basePrice;
    private double reduction;
    private int threshold;
    private String image;
    private int quantity;
    private String description;
    private ProdCat category;
    
    public ProductDto(long id, String name, BigDecimal basePrice, double reduction, int threshold, String image, int quantity, String description, ProdCat category) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.reduction = reduction;
        this.threshold = threshold;
        this.image = image;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
    }
    
    // Getters and setters for all attributes...

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public double getReduction() {
        return reduction;
    }

    public void setReduction(double reduction) {
        this.reduction = reduction;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public ProdCat getCategory() {
        return category;
    }

    public void setCategory(ProdCat category) {
        this.category = category;
    }
}
