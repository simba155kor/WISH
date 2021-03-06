package com.wish.db.entity;


import lombok.Getter;
import lombok.Setter;


import javax.persistence.Entity;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class CustomQuestion  extends BaseEntity{
	// 미팅방ID, 질문내용, 
	// 미팅룸 사용 중에 여기 접근한다.
	// 미팅룸 종료시 사전질문도 삭제된다.
	String meetingroomId;
	String content;
}
