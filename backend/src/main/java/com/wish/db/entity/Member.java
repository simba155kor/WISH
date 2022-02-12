package com.wish.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

import javax.persistence.*;

/**
 * 멤버 모델 정의.
 */
@Entity
@Getter
@Setter
public class Member{
    @Id
	String id;

    String name;
    String email;
    
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    
    Date signUpDate;
    
}