package net.javaguides.springboot.exception;


public class QuantityExceededException extends RuntimeException {
	
    private static final long serialVersionUID = 1L;

    public QuantityExceededException() {
        super();
    }

    public QuantityExceededException(String message) {
        super(message);
    }

    public QuantityExceededException(String message, Throwable cause) {
        super(message, cause);
    }

    public QuantityExceededException(Throwable cause) {
        super(cause);
    }
}
