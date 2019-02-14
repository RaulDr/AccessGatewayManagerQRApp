package com.unitbv.accessGatewayManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessGatewayResponse {
    private String data;
    private boolean isAllowed;
}
