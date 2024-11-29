package com.intissar.demo.service;

import java.util.ArrayList;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.intissar.demo.entities.Ecrivain;
import com.intissar.demo.entities.Genre;
import com.intissar.demo.repos.EcrivainRepository;
import com.intissar.demo.repos.ImageRepository;

@Service
public class EcrivainServiceImpl implements EcrivainService { 
	
	@Autowired
    EcrivainRepository ecrivainRepository;
    @Autowired
    ImageRepository imageRepository;
	

    @PreAuthorize("hasAuthority('ADMIN')")
    @Override
    public Ecrivain saveEcrivain(Ecrivain e) {
        return ecrivainRepository.save(e);
    }


    @Override
    public Ecrivain updateEcrivain(Ecrivain e) {
    	Ecrivain ecrivUpdated = ecrivainRepository.save(e);
        return ecrivUpdated;
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
        return ecrivainRepository.findById(id).get();
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
	public List<Ecrivain> findByNomHonoraires(String nom, Double honoraires) {
		return ecrivainRepository.findByNomHonoraires(nom, honoraires);
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
	public List<Ecrivain> trierEcrivainsNomsHonoraires() {
		return ecrivainRepository.trierEcrivainsNomsHonoraires();
	}


}
