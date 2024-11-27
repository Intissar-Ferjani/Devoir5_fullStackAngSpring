package com.intissar.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

//@Entity
//@Builder
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class Image {
//	
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long idImage ;
//	
//	private String name ;
//	private String type ;
//	
//	@Column( name = "IMAGE" , length = 4048576 )
//	@Lob
//	private byte[] image;
//	
////	@OneToOne
////	private Ecrivain ecrivain;
//	
//	 @ManyToOne()
//	 @JoinColumn (name="ECRIVAIN_ID")
//	 @JsonIgnore
//	 private Ecrivain ecrivain;
//
//}

@Entity 
@Builder 
@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class Image { 
@Id 
@GeneratedValue(strategy = GenerationType.IDENTITY) 
private Long idImage ; 
private String name ; 
private String type ; 
@Column( name = "IMAGE" , length = 4048576 )  
@Lob 
private byte[] image;   
@ManyToOne
@JoinColumn (name="ecrivain_id")
@JsonIgnore 
private Ecrivain ecrivain;
} 