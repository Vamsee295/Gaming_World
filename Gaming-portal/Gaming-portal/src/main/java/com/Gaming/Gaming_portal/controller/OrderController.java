package com.Gaming.Gaming_portal.controller;

import com.Gaming.Gaming_portal.dto.PurchaseRequest;
import com.Gaming.Gaming_portal.dto.PurchaseResponse;
import com.Gaming.Gaming_portal.model.Order;
import com.Gaming.Gaming_portal.model.User;
import com.Gaming.Gaming_portal.repository.OrderRepository;
import com.Gaming.Gaming_portal.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @PostMapping("/checkout")
    public ResponseEntity<PurchaseResponse> checkout(
            @AuthenticationPrincipal User user,
            @RequestBody PurchaseRequest request
    ) {
        return ResponseEntity.ok(orderService.createOrder(user, request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderRepository.findByUser(user));
    }
}



