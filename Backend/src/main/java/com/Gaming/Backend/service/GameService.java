package com.Gaming.Backend.service;

import com.Gaming.Backend.dto.game.GameDTO;
import com.Gaming.Backend.entity.Game;
import com.Gaming.Backend.entity.Publisher;
import com.Gaming.Backend.exception.ResourceNotFoundException;
import com.Gaming.Backend.repository.GameRepository;
import com.Gaming.Backend.repository.PublisherRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameService {

    private final GameRepository gameRepository;
    private final PublisherRepository publisherRepository;
    private final ModelMapper modelMapper;

    public Page<GameDTO> getAllGames(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<Game> games = gameRepository.findByActiveTrue(pageable);
        return games.map(this::convertToDTO);
    }

    public GameDTO getGameById(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id: " + id));
        return convertToDTO(game);
    }

    public Page<GameDTO> searchGames(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Game> games = gameRepository.searchGames(keyword, pageable);
        return games.map(this::convertToDTO);
    }

    public Page<GameDTO> filterGames(String genre, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Game> games = gameRepository.findWithFilters(genre, minPrice, maxPrice, pageable);
        return games.map(this::convertToDTO);
    }

    public List<GameDTO> getFeaturedGames(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return gameRepository.findFeaturedGames(pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<GameDTO> getGamesOnSale(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return gameRepository.findGamesOnSale(pageable).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private GameDTO convertToDTO(Game game) {
        GameDTO dto = modelMapper.map(game, GameDTO.class);
        dto.setDiscountedPrice(game.getDiscountedPrice());
        if (game.getPublisher() != null) {
            dto.setPublisherName(game.getPublisher().getName());
        }
        return dto;
    }
}
