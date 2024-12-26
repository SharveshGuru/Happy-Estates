package com.realestate.app;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.realestate.app.controller.LeaseController;
import com.realestate.app.controller.PropertyController;
import com.realestate.app.controller.TenantController;
import com.realestate.app.entity.Lease;
import com.realestate.app.entity.Property;
import com.realestate.app.entity.Tenant;
import com.realestate.app.service.LeaseService;
import com.realestate.app.service.PropertyService;
import com.realestate.app.service.TenantService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.*;

@SpringBootTest
class AppApplicationTests {

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private LeaseService leaseService;

    @MockBean
    private PropertyService propertyService;

    @MockBean
    private TenantService tenantService;

    @Autowired
    private LeaseController leaseController;

    @Autowired
    private PropertyController propertyController;

    @Autowired
    private TenantController tenantController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(leaseController, propertyController, tenantController).build();
    }

    // LeaseController Tests
    @Test
    void testCreateLeaseEndpoint() throws Exception {
        Lease lease = new Lease();
        lease.setId(1L);
        when(leaseService.createLease(any(Lease.class))).thenReturn(lease);

        mockMvc.perform(post("/leases")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(lease)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testGetLeaseByIdEndpoint() throws Exception {
        Lease lease = new Lease();
        lease.setId(1L);
        when(leaseService.getLeaseById(1L)).thenReturn(Optional.of(lease));

        mockMvc.perform(get("/leases/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testDeleteLeaseEndpoint() throws Exception {
        doNothing().when(leaseService).deleteLease(1L);

        mockMvc.perform(delete("/leases/1"))
                .andExpect(status().isNoContent());
        verify(leaseService, times(1)).deleteLease(1L);
    }

    // PropertyController Tests
    @Test
    void testCreatePropertyEndpoint() throws Exception {
        Property property = new Property();
        property.setId(1L);
        when(propertyService.createProperty(any(Property.class))).thenReturn(property);

        mockMvc.perform(post("/properties")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(property)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testGetPropertyByIdEndpoint() throws Exception {
        Property property = new Property();
        property.setId(1L);
        when(propertyService.getPropertyById(1L)).thenReturn(Optional.of(property));

        mockMvc.perform(get("/properties/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testDeletePropertyEndpoint() throws Exception {
        doNothing().when(propertyService).deleteProperty(1L);

        mockMvc.perform(delete("/properties/1"))
                .andExpect(status().isNoContent());
        verify(propertyService, times(1)).deleteProperty(1L);
    }

    // TenantController Tests
    @Test
    void testCreateTenantEndpoint() throws Exception {
        Tenant tenant = new Tenant();
        tenant.setId(1L);
        when(tenantService.createTenant(any(Tenant.class))).thenReturn(tenant);

        mockMvc.perform(post("/tenants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(tenant)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testGetTenantByIdEndpoint() throws Exception {
        Tenant tenant = new Tenant();
        tenant.setId(1L);
        when(tenantService.getTenantById(1L)).thenReturn(Optional.of(tenant));

        mockMvc.perform(get("/tenants/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    void testDeleteTenantEndpoint() throws Exception {
        doNothing().when(tenantService).deleteTenant(1L);

        mockMvc.perform(delete("/tenants/1"))
                .andExpect(status().isNoContent());
        verify(tenantService, times(1)).deleteTenant(1L);
    }
}