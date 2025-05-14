package com.example.jfsdsdp.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Application {

    @Id
    @GeneratedValue
    private Long id;
    private Long scholarshipId;
    private String scholarshipName; // Add this field
    private String userName;
    private String email;
    private String status;
    private Long userId;

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	// Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(Long scholarshipId) {
        this.scholarshipId = scholarshipId;
    }

    public String getScholarshipName() {
        return scholarshipName;
    }

    public void setScholarshipName(String scholarshipName) {
        this.scholarshipName = scholarshipName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
