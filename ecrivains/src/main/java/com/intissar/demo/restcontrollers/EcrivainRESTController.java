package com.intissar.demo.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.intissar.demo.entities.Ecrivain;
import com.intissar.demo.service.EcrivainService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EcrivainRESTController {

    @Autowired
    EcrivainService ecrivainService;

    @RequestMapping(path="/all",method = RequestMethod.GET)
	public List<Ecrivain> getAllEcrivains() {
		return ecrivainService.getAllEcrivains();
	}

    @RequestMapping(value = "/getbyid/{id}", method = RequestMethod.GET)
	public Ecrivain getEcrivainById(@PathVariable("id") Long id) {
		return ecrivainService.getEcrivain(id);
	}
    
    @RequestMapping(value = "/addEcrivain", method = RequestMethod.POST)
	public Ecrivain createEcrivain(@RequestBody Ecrivain e) {
		return ecrivainService.saveEcrivain(e);
	}
    
    @RequestMapping(value = "/updateEcrivain", method = RequestMethod.PUT)
	public Ecrivain updateEcrivain(@RequestBody Ecrivain e) {
		return ecrivainService.updateEcrivain(e);
	}
    
    @RequestMapping(value = "/delEcrivain/{id}", method = RequestMethod.DELETE)
	public void deleteEcrivain(@PathVariable("id") Long id) {
		ecrivainService.deleteEcrivainById(id);
	}
    
    @RequestMapping(value = "/ecrivsGen/{idG}", method = RequestMethod.GET)
	public List<Ecrivain> getEcrivainsByGenId(@PathVariable("idG") Long id) {
		return ecrivainService.findByGenreIdG(id);
	}
    
    @RequestMapping(value = "/ecrivsByName/{nom}", method = RequestMethod.GET)
	public List<Ecrivain> findByNomEcrivainContains(@PathVariable("nom") String nom) {
		return ecrivainService.findByNomEcrivainContains(nom);
	}


}
