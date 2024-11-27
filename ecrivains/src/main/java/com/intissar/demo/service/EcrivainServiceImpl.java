package com.intissar.demo.service;

import java.util.ArrayList;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.intissar.demo.entities.Ecrivain;
import com.intissar.demo.entities.Genre;
import com.intissar.demo.repos.EcrivainRepository;

@Service
public class EcrivainServiceImpl implements EcrivainService { 
	
	@Autowired
	EcrivainRepository ecrivainRepository;
	
//	@Autowired
//	ModelMapper modelMapper;

	@Override
	public Ecrivain saveEcrivain(Ecrivain e) {
		return ecrivainRepository.save(e);
	}

	@Override
	public Ecrivain updateEcrivain(Ecrivain e) {
		 if (!ecrivainRepository.existsById(e.getIdEcrivain())) 
	        throw new ResourceNotFoundException("Ingredient not found with id " + e.getIdEcrivain());
	        
	     return ecrivainRepository.save(e);
	}

	@Override
	public void deleteEcrivain(Ecrivain e) {
		ecrivainRepository.delete(e);	
	}

	@Override
	public void deleteEcrivainById(Long id) {
		ecrivainRepository.deleteById(id);
		
	}

	@Override
	public Ecrivain getEcrivain(Long id) {
		return ecrivainRepository.findById(id).orElse(null);
	}

	@Override
	public List<Ecrivain> getAllEcrivains() {
		 return ecrivainRepository.findAll();
	}
	
	@Override
	public List<Ecrivain> findByNomEcrivain(String nom) {
		return ecrivainRepository.findByNomEcrivain(nom);
	}
	
	@Override
	public List<Ecrivain> findByNomEcrivainContains(String nom) {
		return ecrivainRepository.findByNomEcrivainContains(nom);
	}
	
	@Override
	public List<Ecrivain> findByNomPrix(String nom, Double prix) {
		return ecrivainRepository.findByNomPrix(nom, prix);
	}
	
	@Override
	public List<Ecrivain> findByGenre(Genre g) {
		return ecrivainRepository.findByGenre(g);
	}
	
	@Override
	public List<Ecrivain> findByGenreIdG(Long id) {
		return ecrivainRepository.findByGenreIdG(id);
	}
	
	@Override
	public List<Ecrivain> findByOrderByNomEcrivainAsc() {
		return ecrivainRepository.findByOrderByNomEcrivainAsc();
	}
	
	@Override
	public List<Ecrivain> trierEcrivainsNomsPrix() {
		return ecrivainRepository.trierEcrivainsNomsPrix();
	}



}
