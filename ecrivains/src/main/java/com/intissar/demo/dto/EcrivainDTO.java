package com.intissar.demo.dto;

import java.util.Date;

import com.intissar.demo.entities.Genre;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EcrivainDTO {

	private Long idEcrivain;
	private String nomEcrivain;
	private Double prixLivre;
	private Date dateCreation;
	private Genre genre;
	private String nomGen;
}
