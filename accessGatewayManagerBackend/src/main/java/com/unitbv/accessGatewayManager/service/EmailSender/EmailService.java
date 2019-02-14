package com.unitbv.accessGatewayManager.service.EmailSender;

public interface EmailService {
    void sendSimpleMessage(
            String to, String subject, String text);
}
