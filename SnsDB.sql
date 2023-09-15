-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.34 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 react.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `U_ID` varchar(50) NOT NULL,
  `C_NO` int NOT NULL AUTO_INCREMENT,
  `C_ID` varchar(50) NOT NULL DEFAULT '0',
  `C_COMMENT` varchar(50) NOT NULL DEFAULT '0',
  `PF_NO` int DEFAULT NULL,
  `P_NO` int NOT NULL COMMENT '게시물번호 조인용',
  PRIMARY KEY (`C_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='댓글(C)';

-- 테이블 데이터 react.comment:~11 rows (대략적) 내보내기
INSERT INTO `comment` (`U_ID`, `C_NO`, `C_ID`, `C_COMMENT`, `PF_NO`, `P_NO`) VALUES
	('test', 15, 'test', '화이트가 진짜 이쁘더라구요 ! ', NULL, 5),
	('아이유좋아', 16, 'test', '아이유 실물 어때요 ㅠㅠ', NULL, 1),
	('JOAJOA77', 17, 'test', '저 저녁8시쯤 같이 하실래요?', NULL, 2),
	('스폰지밥그릇', 18, 'test', '롯데리아가 최고', NULL, 3),
	('아이유좋아', 20, 'test', '가고싶다', NULL, 1),
	('JOAJOA77', 21, 'test', '아 안될듯..', NULL, 2),
	('test', 22, 'yeodae', '전 그레이 사려구요 헿', NULL, 5),
	('아이유좋아', 23, 'yeodae', '사진 더 없나요?', NULL, 1),
	('JOAJOA77', 24, 'yeodae', '개 귀엽다', NULL, 2),
	('스폰지밥그릇', 25, 'yeodae', '난 맘터가 좋더라', NULL, 3),
	('yeodae', 26, 'yeodae', '#증사 #맞팔', NULL, 15),
	('yeodae', 27, 'chacha', '이뿌다', NULL, 16),
	('yeodae', 28, 'chacha', '헐 너무 귀여워요 ㅠ', NULL, 15),
	('yeodae', 29, 'chacha', 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', NULL, 14),
	('chacha', 30, 'lowlow', '저요저', NULL, 18),
	('chacha', 31, 'lowlow', 'ㅜㅜㅜㅜㅜㅜㅜ메롱', NULL, 17),
	('yeodae', 32, 'lowlow', '완전귀여워여 !! ', NULL, 16),
	('yeodae', 33, 'lowlow', '너무 귀엽다 ㅠㅠㅠ', NULL, 14),
	('lowlow', 34, 'yeodae', '얼굴이 부셔진건가요?', NULL, 19),
	('chacha', 35, 'yeodae', '롤 고?', NULL, 18);

-- 테이블 react.like 구조 내보내기
CREATE TABLE IF NOT EXISTS `like` (
  `U_ID` varchar(50) NOT NULL,
  `P_ID` varchar(50) NOT NULL,
  `P_NO` int NOT NULL DEFAULT (0),
  `L_DATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='좋아요(L)';

-- 테이블 데이터 react.like:~0 rows (대략적) 내보내기

-- 테이블 react.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `U_ID` varchar(50) NOT NULL,
  `P_NO` int NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(50) NOT NULL DEFAULT '0',
  `CONTENT` varchar(300) NOT NULL DEFAULT '0',
  `P_DATE` date NOT NULL COMMENT '작성시간',
  `PF_NO` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '게시물 첨부파일경로',
  `TAG` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `LIKE` int(10) unsigned zerofill DEFAULT '0000000000',
  PRIMARY KEY (`P_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시글(P)';

-- 테이블 데이터 react.post:~6 rows (대략적) 내보내기
INSERT INTO `post` (`U_ID`, `P_NO`, `TITLE`, `CONTENT`, `P_DATE`, `PF_NO`, `TAG`, `LIKE`) VALUES
	('yeodae', 14, '우리집 강아지 어릴적', '갑자기 생각나서 찾아봤는데 졸귀 ㅠ', '2023-09-15', '66beac17-d3b7-4f57-9958-7b6992032127.jpg', '#개린이', 0000000005),
	('yeodae', 15, '친구강아지 증명사진 찍고왔다는데', '너무 귀여워서 사진 훔쳐옴 ', '2023-09-15', '496081b2-b8c5-4a93-b403-40653020bbaf.jpg', '#포메 #증명사진', 0000000004),
	('yeodae', 16, '친구 강아지 너무귀엽죠 ㅠ', '나도 이렇게 잘그리고싶다!', '2023-09-15', '912648bf-cb57-4776-908f-8c1f9ea928d1.jpg', '#개화가', 0000000007),
	('chacha', 17, '우리집 강아지 자랑', '기엽져', '2023-09-15', '86faa176-57ac-4407-8f88-3376d3ae674f.jpg', '#자랑', 0000000008),
	('chacha', 18, '심심해', '놀사람!', '2023-09-15', '7918f606-6c20-4b05-8295-a3848ded5d4f.jpg', '', 0000000007),
	('lowlow', 19, '오운완', '후 오늘도 부셨다', '2023-09-15', '89926999-4a09-4c85-a06f-66ec1064ad32.jpg', '#오운완 #헬스타그램', 0000000038);

-- 테이블 react.test 구조 내보내기
CREATE TABLE IF NOT EXISTS `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `pw` varchar(50) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name2` varchar(50) NOT NULL,
  `profile` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.test:~6 rows (대략적) 내보내기
INSERT INTO `test` (`id`, `email`, `pw`, `name`, `name2`, `profile`) VALUES
	(1, 'test', '11', '박철수', '철수묭', 'https://search.pstatic.net/common?type=f&size=260x260&quality=95&direct=true&src=http%3A%2F%2Fshop1.phinf.naver.net%2F20210321_259%2F16163346682119dx8v_JPEG%2F52470285477683295_-1182927948.jpeg'),
	(20, 'yeodae', '11', '여대현', '여대', 'https://search.pstatic.net/common?type=f&size=258x260&quality=95&direct=true&src=http%3A%2F%2Fshop1.phinf.naver.net%2F20200508_128%2F1588866022785Uoef7_JPEG%2F25001638306463665_-2089163125.jpeg'),
	(21, 'lowlow', '11', '김로우', '로우', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAxMTJfMTkg%2FMDAxNjQxOTczNDU2NjA3.fIXvw4Rw9S7ti9MWPadh9bsS2qIO4r8PjyHqPBfxWLEg.6r5GW7kDx5-GYnDDlmyyBmzYnhZtTPeXrEj1LFUvKrcg.JPEG.missoeam%2FIMG_6903.JPG&type=a340'),
	(22, 'chacha', '1', '차차', '차차야', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMDJfMTc3%2FMDAxNjc1MzQ4NzIzMjIx.ZdKw5PHlewx3tVjQ6nHJ1yp1189nPOFJ4FzpOt_uUj4g.MyDpFI4AwThtR3F5_e_vR-lB1G4_UKdbN8y8Sz9csMQg.JPEG.emandoo1221%2FIMG_9653.JPG&type=a340'),
	(23, 'dolp', '11', '김돌프', '돌프', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDFfNDMg%2FMDAxNjI3ODE1Mjg4NzIw.9IRO1072lAK8Gzus8BX91KeZWtjA-hMrDoPsfRk6sb4g.D-i9xl8VSs0HAkfewwQ9CmyIzxN0bDrE7KJ7lZClsRsg.JPEG.luving_k%2FIMG_9676.JPG&type=sc960_832'),
	(24, 'Taki', '11', '김택', '택이', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMDhfNTUg%2FMDAxNjQ2NzIyNDA4Mzc2.A-TGBK4QUoRRp5QXDThZ_g3XfBtgx9_iLJAlkTCJ5ukg.oTASUVGi8fqtNetgfqhIEQ6h8HBevq6pQg6udIe006Ig.JPEG.ddogddogcafe%2F93.jpg&type=a340');

-- 테이블 react.upload 구조 내보내기
CREATE TABLE IF NOT EXISTS `upload` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_path` varchar(255) NOT NULL,
  `uploaded_at` date DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='파일업로드';

-- 테이블 데이터 react.upload:~0 rows (대략적) 내보내기

-- 테이블 react.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `test` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 react.user:~2 rows (대략적) 내보내기
INSERT INTO `user` (`test`) VALUES
	(1),
	(2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
