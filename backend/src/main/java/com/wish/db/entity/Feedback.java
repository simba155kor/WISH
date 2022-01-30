package com.wish.db.entity;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;

/**
 * 피드백 모델 정의.
 */
@Entity
@Getter
@Setter
public class Feedback  extends BaseEntity{
    // 스터디 이름, 평가받는 유저 아이디, 질문, 평가점수, 평가내용, 스터디 날짜, 시작시간, 

    Long meetingId;
    String memberId;
    String question;
    float rate;
    String comment;
    Date date;
    Time time;

}