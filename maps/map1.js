class Map1 extends Map {
    
    constructor(rows, cols) {
        super(rows, cols);
    }
    
    init() {
        
        this.map = [
            22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 2, 8, 12, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 7, 7, 3, 7, 7, 7, 7, 44, 7, 7, 7, 58, 45, 7, 45, 7, 7, 7, 7, 7, 7, 2, 7, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 4, 8, 7, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 7, 2, 7, 9, 58, 7, 7, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 7, 44, 7, 7, 7, 7, 7, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 7, 7, 7, 1, 7, 6, 58, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 7, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 13, 13, 13, 13, 20, 13, 13, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 8, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 15, 15, 15, 15, 17, 18, 57, 19, 15, 15, 19, 15, 15, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 7, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 7, 8, 3, 7, 7, 5, 7, 2, 1, 7, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 12, 23, 23, 23, 23, 23, 23, 23, 23, 23, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 7, 4, 7, 7, 7, 4, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 24, 25, 30, 25, 26, 2, 7, 7, 7, 12, 7, 9, 7, 5, 31, 30, 30, 30, 30, 29, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 6, 7, 8, 7, 7, 7, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 13, 13, 13, 7, 7, 45, 7, 7, 7, 7, 4, 7, 13, 13, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 7, 7, 7, 7, 7, 6, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 13, 13, 13, 7, 7, 7, 1, 7, 8, 7, 45, 7, 13, 13, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 7, 1, 7, 7, 7, 7, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 13, 13, 13, 7, 8, 7, 7, 7, 7, 7, 7, 7, 13, 13, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 1, 7, 7, 7, 7, 7, 7, 9, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 13, 13, 13, 7, 7, 2, 7, 45, 7, 7, 10, 7, 13, 13, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 18, 18, 20, 19, 14, 2, 7, 7, 7, 7, 6, 7, 7, 7, 16, 20, 16, 19, 20, 17, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 7, 7, 3, 7, 7, 7, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 58, 23, 23, 23, 23, 23, 23, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 31, 25, 25, 25, 29, 58, 31, 25, 25, 25, 29, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 7, 7, 7, 7, 7, 9, 7, 7, 1, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 15, 13, 20, 13, 19, 7, 16, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 46, 7, 4, 7, 7, 7, 7, 7, 4, 7, 7, 7, 46, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 31, 25, 25, 25, 29, 1, 31, 25, 25, 25, 29, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 3, 23, 23, 23, 23, 23, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 20, 13, 15, 13, 7, 18, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 9, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 31, 25, 25, 25, 29, 8, 31, 25, 25, 25, 29, 22, 22, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 7, 24, 25, 25, 25, 25, 26, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 15, 20, 13, 7, 13, 13, 13, 13, 13, 22, 22, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 7, 17, 15, 15, 15, 15, 15, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 31, 25, 25, 25, 29, 7, 31, 25, 25, 25, 29, 22, 22, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 19, 2, 15, 15, 15, 15, 15, 15, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 13, 13, 14, 13, 13, 6, 18, 13, 13, 13, 13, 22, 22, 15, 15, 15, 15, 15, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 18, 15, 44, 15, 15, 15, 15, 15, 15, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 44, 23, 23, 23, 23, 23, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 44, 15, 15, 15, 15, 15, 15, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 58, 45, 58, 1, 58, 58, 2, 58, 58, 33, 34, 34, 34, 34, 34, 34, 34, 40, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 58, 23, 23, 23, 23, 23, 23, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 43, 46, 46, 46, 46, 46, 46, 46, 42, 7, 7, 7, 7, 7, 9, 7, 7, 7, 7, 7, 33, 34, 34, 34, 34, 34, 40, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 8, 58, 58, 3, 58, 58, 58, 3, 58, 58, 43, 46, 46, 46, 46, 46, 46, 46, 42, 7, 2, 7, 7, 7, 7, 7, 7, 3, 7, 7, 43, 46, 46, 46, 46, 46, 42, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 58, 58, 58, 58, 45, 58, 44, 58, 58, 43, 46, 46, 46, 46, 46, 46, 46, 42, 7, 7, 7, 7, 9, 7, 45, 45, 7, 7, 7, 43, 46, 46, 46, 46, 46, 42, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 8, 44, 58, 58, 58, 58, 58, 58, 58, 43, 46, 46, 46, 46, 46, 46, 46, 42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 43, 46, 46, 46, 46, 46, 42, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 58, 58, 1, 58, 12, 58, 1, 58, 58, 43, 46, 46, 46, 46, 46, 46, 46, 42, 7, 7, 3, 7, 7, 7, 7, 2, 7, 7, 7, 43, 46, 46, 46, 46, 46, 42, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 45, 58, 58, 58, 58, 8, 58, 58, 58, 32, 30, 30, 30, 30, 30, 30, 30, 41, 7, 7, 45, 45, 45, 7, 7, 7, 7, 7, 7, 43, 46, 46, 46, 46, 46, 42, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 13, 18, 13, 13, 13, 13, 13, 13, 13, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 32, 35, 35, 35, 35, 35, 41, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 11, 44, 58, 5, 58, 58, 45, 44, 58, 13, 13, 13, 18, 13, 13, 18, 13, 13, 7, 7, 7, 7, 7, 7, 7, 7, 3, 7, 7, 13, 13, 19, 13, 13, 13, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 58, 58, 58, 58, 58, 58, 58, 5, 58, 13, 20, 13, 14, 20, 13, 13, 20, 13, 58, 7, 7, 11, 7, 7, 7, 7, 7, 7, 7, 17, 13, 13, 13, 13, 16, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 58, 58, 58, 58, 9, 58, 58, 45, 58, 5, 7, 3, 7, 7, 6, 7, 7, 7, 5, 44, 58, 7, 7, 7, 7, 7, 7, 7, 7, 11, 13, 20, 13, 20, 13, 20, 13, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22
        ];
        
        this.tileMap = [];
        this.enemies = [];
        this.deadZombies = [];
        this.items = [];
        this.maxCorpses = 10;

        for (var a = 0; a < this.rows * this.cols; a++) {
            var x = a % this.cols;
            var y = Math.floor(a / this.cols);
            if (this.map[a] === CRATE_TYPE || this.map[a] === CRATE_TYPE_NO_ITEM) {
                this.tileMap[a] = new Crate(x, y, this.tileWidth, this.tileHeight, this, this.map[a] === CRATE_TYPE);
            } else if (this.map[a] === BARREL_TYPE) {
                this.tileMap[a] = new Barrel(x, y, this.tileWidth, this.tileHeight, this);
            } else if (this.map[a] === EXIT_TYPE) {
                this.tileMap[a] = new Exit(x, y, this.tileWidth, this.tileHeight, this);
            } else {
                this.tileMap[a] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[a]);
            }
        }
        
        var zombieKillerWidth = this.tileWidth * 0.8;
        var zombieKillerHeight = this.tileHeight * 0.8;
        
        var canvasWidth = Config.getInstance().canvasWidth;
        var canvasHeight = Config.getInstance().canvasHeight;
        var xOffset = canvasWidth / 2 - zombieKillerWidth / 2;
        var yOffset = canvasHeight / 2 - zombieKillerHeight / 2;
        var origX = 5 * this.tileWidth;
        var origY = 5 * this.tileHeight;
        var newOffsetX = xOffset - origX - this.tileWidth / 2 + zombieKillerWidth / 2;
        var newOffsetY = yOffset - origY - this.tileHeight / 2 + zombieKillerHeight / 2;
        
        this.zombieKiller = new ZombieKiller(xOffset, yOffset, zombieKillerWidth, zombieKillerHeight, this);
        this.camera.init(6, 4, newOffsetX, newOffsetY);
        
        this.items.push(new Life(7 * this.tileWidth, 5 * this.tileHeight, this.tileWidth * 0.6, this.tileHeight * 0.6, this));
        
        
        var zombieSize = this.tileWidth * 0.8;
        this.enemies.push(new Zombie(18 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 6 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth, 10, 10, 1));
        
        this.enemies.push(new Zombie(15 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 19 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        this.enemies.push(new Zombie(16 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 21 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        this.enemies.push(new Zombie(21 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 21 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        this.enemies.push(new Zombie(19 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 19 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        this.enemies.push(new Zombie(22 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        this.enemies.push(new Zombie(14 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 21 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        this.enemies.push(new Zombie(14 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        this.enemies.push(new Zombie(20 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 20 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        
        this.enemies.push(new Zombie(22 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 30 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth, 10, 2, 1));
        this.enemies.push(new Zombie(22 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 30 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 1.5, 10, 2, 1));
        this.enemies.push(new Zombie(22 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 29 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 0.8, 10, 2, 1));
        this.enemies.push(new Zombie(22 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 29 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 10, 2, 1));
        
        var eyeSize = this.tileWidth * 1.2;
        this.enemies.push(new Eye(25 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 34 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this, 2));
        this.enemies.push(new Eye(29 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 34 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this, 1));
        this.enemies.push(new Eye(25 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 37 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this, 3));
        this.enemies.push(new Eye(29 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 37 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this, 1));
        
        this.enemies.push(new Zombie(22 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 34 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(26 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 32 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(29 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 32 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(27 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 37 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(23 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 40 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(26 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 40 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(26 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 42 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(30 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 41 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(28 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 38 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        this.enemies.push(new Zombie(23 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 36 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 5, 2, 1));
        
        zombieSize = this.tileWidth * 1.2;
        
        this.enemies.push(new Zombie(46 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 36 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 20, 2, 2));
        this.enemies.push(new Zombie(46 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 36 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 20, 2, 2));
        this.enemies.push(new Zombie(42 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 34 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 1.5, 20, 2, 2));
        this.enemies.push(new Zombie(42 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 34 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 2, 20, 2, 2));
        this.enemies.push(new Zombie(42 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 34 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 1.5, 20, 2, 2));
        this.enemies.push(new Zombie(10 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 6 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, this.tileWidth * 1, 20, 2, 2));
        
        /*
        this.enemies.push(new Zombie(7 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 11 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 120));
        this.enemies.push(new Zombie(8 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 12 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 150));
        this.enemies.push(new Zombie(9 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 12 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 140));
        this.enemies.push(new Zombie(9 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 9 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 130));
        
        this.enemies.push(new Zombie(6 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 4 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 130));
        this.enemies.push(new Zombie(7 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 8 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 170));
        this.enemies.push(new Zombie(7 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 9 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 100));
        
        this.enemies.push(new Zombie(12 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 180));
        this.enemies.push(new Zombie(13 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 190));
        
        this.enemies.push(new Zombie(14 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 11 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 150));
        this.enemies.push(new Zombie(15 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 11 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 80));
        this.enemies.push(new Zombie(15 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 12 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 130));
        this.enemies.push(new Zombie(15 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 13 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 170));
        this.enemies.push(new Zombie(16 * this.tileWidth + this.tileWidth / 2 - zombieSize / 2, 13 * this.tileHeight + this.tileHeight / 2 - zombieSize / 2, zombieSize, zombieSize, this, 150));
        
        var eyeSize = this.tileWidth * 1.2;
        this.enemies.push(new Eye(9 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 13 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this));
        
        eyeSize = this.tileWidth;
        this.enemies.push(new MovingEye(16 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this));
        this.enemies.push(new ZombieSnake(16 * this.tileWidth + this.tileWidth / 2 - eyeSize / 2, 16 * this.tileHeight + this.tileHeight / 2 - eyeSize / 2, eyeSize, eyeSize, this));
        */
        this.events = [];
    }
}

