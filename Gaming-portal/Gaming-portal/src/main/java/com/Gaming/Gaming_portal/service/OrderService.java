package com.Gaming.Gaming_portal.service;

import com.Gaming.Gaming_portal.dto.PurchaseRequest;
import com.Gaming.Gaming_portal.dto.PurchaseResponse;
import com.Gaming.Gaming_portal.model.*;
import com.Gaming.Gaming_portal.repository.GameRepository;
import com.Gaming.Gaming_portal.repository.OrderRepository;
import com.Gaming.Gaming_portal.repository.UserGameOwnershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final GameRepository gameRepository;
    private final OrderRepository orderRepository;
    private final UserGameOwnershipRepository ownershipRepository;

    @Transactional
    public PurchaseResponse createOrder(User user, PurchaseRequest request) {
        if (request.getGameIds() == null || request.getGameIds().isEmpty()) {
            throw new IllegalArgumentException("No games selected for purchase");
        }

        List<Game> games = gameRepository.findAllById(request.getGameIds());
        if (games.isEmpty()) {
            throw new IllegalArgumentException("Requested games not found");
        }

        BigDecimal total = BigDecimal.ZERO;
        for (Game game : games) {
            BigDecimal price = game.getPrice();
            if (game.getDiscount() != null) {
                BigDecimal discountFactor = BigDecimal.ONE
                        .subtract(game.getDiscount().divide(BigDecimal.valueOf(100)));
                price = price.multiply(discountFactor);
            }
            total = total.add(price);
        }

        // Mock payment: always success for now
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(total);
        order.setStatus(OrderStatus.SUCCESS);
        order.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "MOCK");

        List<OrderItem> items = new ArrayList<>();
        for (Game game : games) {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setGame(game);
            item.setPriceAtPurchase(game.getPrice());
            item.setDiscountApplied(game.getDiscount());
            items.add(item);
        }
        order.setItems(items);

        Order savedOrder = orderRepository.save(order);

        // Add to user library
        for (Game game : games) {
            if (!ownershipRepository.existsByUserAndGame(user, game)) {
                UserGameOwnership ownership = UserGameOwnership.builder()
                        .user(user)
                        .game(game)
                        .orderId(savedOrder.getId())
                        .build();
                ownershipRepository.save(ownership);
            }
        }

        PurchaseResponse response = new PurchaseResponse();
        response.setOrderId(savedOrder.getId());
        response.setTotalAmount(savedOrder.getTotalAmount());
        response.setStatus(savedOrder.getStatus().name());
        response.setGameIds(games.stream().map(Game::getId).toList());
        return response;
    }
}



