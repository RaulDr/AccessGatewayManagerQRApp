package com.unitbv.accessGatewayManager.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AccessGatewayRequest {
    private Long idUser;
    private String gateName;
}
