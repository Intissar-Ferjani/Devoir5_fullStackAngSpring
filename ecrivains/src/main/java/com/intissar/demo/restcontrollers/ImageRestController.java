package com.intissar.demo.restcontrollers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.intissar.demo.entities.Image;
import com.intissar.demo.service.ImageService;


@RestController
@RequestMapping("/api/image")
@CrossOrigin("*")
public class ImageRestController {
    @Autowired
    ImageService imageService;

    @PostMapping(value = "/uplaodImageEcriv/{idEcriv}")
    public Image uploadMultiImages(@RequestParam("image") MultipartFile file,
            @PathVariable("idEcriv") Long idEcriv)
            throws IOException {
        return imageService.uplaodImageEcriv(file, idEcriv);
    }

    @RequestMapping(value = "/getImagesEcriv/{idEcriv}", method = RequestMethod.GET)
    public List<Image> getImagesEcriv(@PathVariable("idEcriv") Long idEcriv)
            throws IOException {
        return imageService.getImagesParEcriv(idEcriv);
    }

    @PostMapping("/upload")
    public Image uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uplaodImage(file);
    }

    @GetMapping("/get/info/{id}")
    public Image getImageDetails(@PathVariable("id") Long id) throws IOException {
        return imageService.getImageDetails(id);
    }

    @RequestMapping(value = "/load/{id}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) throws IOException {
        return imageService.getImage(id);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteImage(@PathVariable("id") Long id) {
        imageService.deleteImage(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Image UpdateImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uplaodImage(file);
    }
}