/*
 Navicat Premium Data Transfer

 Source Server         : 10.1.16.50
 Source Server Type    : MySQL
 Source Server Version : 50627
 Source Host           : 10.1.16.50:3306
 Source Schema         : lims2019db

 Target Server Type    : MySQL
 Target Server Version : 50627
 File Encoding         : 65001

 Date: 03/05/2019 11:01:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project_plan_progress
-- ----------------------------
DROP TABLE IF EXISTS `project_plan_progress`;
CREATE TABLE `project_plan_progress`  (
  `project_plan_progresses_id` bigint(20) NOT NULL,
  `progress_id` bigint(20) NULL DEFAULT NULL,
  INDEX `FK2dl0vqwriw4qodso33aajn5pv`(`progress_id`) USING BTREE,
  INDEX `FK3aybdeo9o3nbh6eptc9wbmt29`(`project_plan_progresses_id`) USING BTREE,
  CONSTRAINT `FK2dl0vqwriw4qodso33aajn5pv` FOREIGN KEY (`progress_id`) REFERENCES `progress` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK3aybdeo9o3nbh6eptc9wbmt29` FOREIGN KEY (`project_plan_progresses_id`) REFERENCES `project_plan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of project_plan_progress
-- ----------------------------
INSERT INTO `project_plan_progress` VALUES (172, 148);
INSERT INTO `project_plan_progress` VALUES (172, 150);
INSERT INTO `project_plan_progress` VALUES (172, 151);
INSERT INTO `project_plan_progress` VALUES (172, 158);
INSERT INTO `project_plan_progress` VALUES (172, 172);
INSERT INTO `project_plan_progress` VALUES (172, 176);
INSERT INTO `project_plan_progress` VALUES (172, 177);
INSERT INTO `project_plan_progress` VALUES (172, 178);
INSERT INTO `project_plan_progress` VALUES (172, 179);
INSERT INTO `project_plan_progress` VALUES (172, 180);
INSERT INTO `project_plan_progress` VALUES (172, 181);
INSERT INTO `project_plan_progress` VALUES (172, 187);
INSERT INTO `project_plan_progress` VALUES (172, 192);
INSERT INTO `project_plan_progress` VALUES (167, 153);
INSERT INTO `project_plan_progress` VALUES (167, 154);
INSERT INTO `project_plan_progress` VALUES (167, 185);
INSERT INTO `project_plan_progress` VALUES (168, 186);
INSERT INTO `project_plan_progress` VALUES (182, 160);
INSERT INTO `project_plan_progress` VALUES (182, 161);
INSERT INTO `project_plan_progress` VALUES (182, 162);
INSERT INTO `project_plan_progress` VALUES (182, 163);
INSERT INTO `project_plan_progress` VALUES (182, 164);
INSERT INTO `project_plan_progress` VALUES (182, 165);
INSERT INTO `project_plan_progress` VALUES (182, 166);
INSERT INTO `project_plan_progress` VALUES (184, 183);
INSERT INTO `project_plan_progress` VALUES (184, 184);
INSERT INTO `project_plan_progress` VALUES (36, 27);
INSERT INTO `project_plan_progress` VALUES (46, 45);
INSERT INTO `project_plan_progress` VALUES (46, 47);
INSERT INTO `project_plan_progress` VALUES (46, 48);
INSERT INTO `project_plan_progress` VALUES (46, 31);
INSERT INTO `project_plan_progress` VALUES (46, 32);
INSERT INTO `project_plan_progress` VALUES (46, 33);
INSERT INTO `project_plan_progress` VALUES (46, 34);
INSERT INTO `project_plan_progress` VALUES (46, 35);
INSERT INTO `project_plan_progress` VALUES (46, 36);
INSERT INTO `project_plan_progress` VALUES (46, 37);
INSERT INTO `project_plan_progress` VALUES (46, 38);
INSERT INTO `project_plan_progress` VALUES (46, 39);
INSERT INTO `project_plan_progress` VALUES (46, 40);
INSERT INTO `project_plan_progress` VALUES (46, 41);
INSERT INTO `project_plan_progress` VALUES (46, 42);
INSERT INTO `project_plan_progress` VALUES (46, 43);
INSERT INTO `project_plan_progress` VALUES (46, 44);
INSERT INTO `project_plan_progress` VALUES (46, 29);
INSERT INTO `project_plan_progress` VALUES (177, 155);
INSERT INTO `project_plan_progress` VALUES (177, 156);
INSERT INTO `project_plan_progress` VALUES (177, 157);
INSERT INTO `project_plan_progress` VALUES (177, 182);
INSERT INTO `project_plan_progress` VALUES (162, 159);
INSERT INTO `project_plan_progress` VALUES (162, 193);
INSERT INTO `project_plan_progress` VALUES (162, 194);
INSERT INTO `project_plan_progress` VALUES (162, 195);
INSERT INTO `project_plan_progress` VALUES (162, 196);
INSERT INTO `project_plan_progress` VALUES (162, 197);
INSERT INTO `project_plan_progress` VALUES (162, 198);
INSERT INTO `project_plan_progress` VALUES (162, 199);
INSERT INTO `project_plan_progress` VALUES (169, 200);
INSERT INTO `project_plan_progress` VALUES (120, 46);
INSERT INTO `project_plan_progress` VALUES (120, 104);
INSERT INTO `project_plan_progress` VALUES (120, 105);
INSERT INTO `project_plan_progress` VALUES (120, 109);
INSERT INTO `project_plan_progress` VALUES (120, 115);
INSERT INTO `project_plan_progress` VALUES (120, 170);
INSERT INTO `project_plan_progress` VALUES (19, 49);
INSERT INTO `project_plan_progress` VALUES (19, 51);
INSERT INTO `project_plan_progress` VALUES (19, 50);
INSERT INTO `project_plan_progress` VALUES (16, 17);
INSERT INTO `project_plan_progress` VALUES (16, 200);
INSERT INTO `project_plan_progress` VALUES (12, 201);
INSERT INTO `project_plan_progress` VALUES (13, 202);
INSERT INTO `project_plan_progress` VALUES (12, 203);
INSERT INTO `project_plan_progress` VALUES (16, 204);
INSERT INTO `project_plan_progress` VALUES (22, 205);
INSERT INTO `project_plan_progress` VALUES (26, 206);
INSERT INTO `project_plan_progress` VALUES (24, 207);
INSERT INTO `project_plan_progress` VALUES (12, 208);
INSERT INTO `project_plan_progress` VALUES (6, 110);
INSERT INTO `project_plan_progress` VALUES (6, 111);
INSERT INTO `project_plan_progress` VALUES (6, 140);
INSERT INTO `project_plan_progress` VALUES (6, 141);
INSERT INTO `project_plan_progress` VALUES (6, 142);
INSERT INTO `project_plan_progress` VALUES (6, 143);
INSERT INTO `project_plan_progress` VALUES (6, 144);
INSERT INTO `project_plan_progress` VALUES (6, 145);
INSERT INTO `project_plan_progress` VALUES (6, 146);
INSERT INTO `project_plan_progress` VALUES (6, 147);
INSERT INTO `project_plan_progress` VALUES (162, 209);
INSERT INTO `project_plan_progress` VALUES (181, 210);
INSERT INTO `project_plan_progress` VALUES (181, 211);
INSERT INTO `project_plan_progress` VALUES (184, 210);
INSERT INTO `project_plan_progress` VALUES (184, 211);
INSERT INTO `project_plan_progress` VALUES (177, 212);
INSERT INTO `project_plan_progress` VALUES (177, 217);
INSERT INTO `project_plan_progress` VALUES (177, 218);
INSERT INTO `project_plan_progress` VALUES (173, 219);
INSERT INTO `project_plan_progress` VALUES (177, 220);
INSERT INTO `project_plan_progress` VALUES (166, 221);
INSERT INTO `project_plan_progress` VALUES (167, 221);
INSERT INTO `project_plan_progress` VALUES (166, 222);
INSERT INTO `project_plan_progress` VALUES (167, 222);
INSERT INTO `project_plan_progress` VALUES (169, 223);
INSERT INTO `project_plan_progress` VALUES (181, 224);

SET FOREIGN_KEY_CHECKS = 1;
