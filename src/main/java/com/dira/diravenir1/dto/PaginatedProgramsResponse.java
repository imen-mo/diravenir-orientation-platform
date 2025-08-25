package com.dira.diravenir1.dto;

import lombok.Data;
import java.util.List;

@Data
public class PaginatedProgramsResponse {
    private List<ProgramDTO> programs;
    private int currentPage;
    private int totalPages;
    private long totalElements;
    private int pageSize;
    private boolean hasNext;
    private boolean hasPrevious;
    private int startPage;
    private int endPage;
    
    public PaginatedProgramsResponse(List<ProgramDTO> programs, int currentPage, 
                                   int totalPages, long totalElements, int pageSize) {
        this.programs = programs;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.pageSize = pageSize;
        this.hasNext = currentPage < totalPages;
        this.hasPrevious = currentPage > 1;
        
        // Calculer les pages à afficher (5 pages max autour de la page courante)
        this.startPage = Math.max(1, currentPage - 2);
        this.endPage = Math.min(totalPages, currentPage + 2);
        
        // Ajuster si on est près des bords
        if (currentPage <= 3) {
            this.endPage = Math.min(totalPages, 5);
        }
        if (currentPage >= totalPages - 2) {
            this.startPage = Math.max(1, totalPages - 4);
        }
    }
}
