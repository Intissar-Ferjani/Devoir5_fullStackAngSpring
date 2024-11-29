package com.intissar.demo.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intissar.demo.entities.Genre;
import com.intissar.demo.repos.GenreRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class GenreRESTController {

	 @Autowired
	    GenreRepository genreRepository;

	    @RequestMapping(path = "/gen", method = RequestMethod.GET)
	    public List<Genre> getAllGenres() {
	        return genreRepository.findAll();
	    }

	    @RequestMapping(value = "/gen/{id}", method = RequestMethod.GET)
	    public Genre getGenreById(@PathVariable("id") Long id) {
	        return genreRepository.findById(id).get();
	    }
	

}
