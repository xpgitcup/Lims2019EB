/*
 Navicat Premium Data Transfer

 Source Server         : sample
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : lims2019db

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 01/05/2019 17:23:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for query_statementa
-- ----------------------------
DROP TABLE IF EXISTS `query_statementa`;
CREATE TABLE `query_statementa`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `version` bigint(20) NOT NULL,
  `format_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `controller_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `issql` bit(1) NOT NULL,
  `action_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `params_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `query_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `key_string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `view_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of query_statementa
-- ----------------------------
INSERT INTO `query_statementa` VALUES (1, 1, NULL, 'operation4QueryStatementA', b'0', 'count', '[]', 'select count(*) from QueryStatementA queryStatementA', 'QueryStatementA', NULL);
INSERT INTO `query_statementa` VALUES (2, 1, NULL, 'operation4QueryStatementA', b'0', 'list', '[max, offset]', 'from QueryStatementA queryStatementA', 'QueryStatementA', 'listQueryStatementA');
INSERT INTO `query_statementa` VALUES (3, 0, NULL, 'home', b'0', 'count', '[]', NULL, '登录', NULL);
INSERT INTO `query_statementa` VALUES (4, 0, NULL, 'home', b'0', 'list', '[max, offset]', NULL, '登录', NULL);
INSERT INTO `query_statementa` VALUES (5, 0, NULL, 'home', b'0', 'list', '[max, offset]', NULL, '近7天进度', NULL);
INSERT INTO `query_statementa` VALUES (6, 0, NULL, 'home', b'0', 'count', '[]', NULL, '近7天进度', NULL);
INSERT INTO `query_statementa` VALUES (7, 0, NULL, 'operation4SystemUser', b'0', 'list', '[max, offset]', 'from SystemUser systemUser', 'SystemUser维护', 'listSystemUser');
INSERT INTO `query_statementa` VALUES (8, 0, NULL, 'operation4SystemUser', b'0', 'count', '[]', 'select count(*) from SystemUser systemUser', 'SystemUser维护', NULL);
INSERT INTO `query_statementa` VALUES (9, 0, NULL, 'operation4SystemUser', b'0', 'list', '[max, offset]', 'from SystemUser systemUser', 'SystemUser', 'listSystemUser');
INSERT INTO `query_statementa` VALUES (10, 0, NULL, 'operation4SystemUser', b'0', 'count', '[]', 'select count(*) from SystemUser systemUser', 'SystemUser', NULL);
INSERT INTO `query_statementa` VALUES (11, 0, NULL, 'operation4DataRootPath', b'0', 'list', '[max, offset]', '', 'DataRootPath维护', '');
INSERT INTO `query_statementa` VALUES (12, 0, NULL, 'operation4DataRootPath', b'0', 'count', '[]', '', 'DataRootPath维护', NULL);
INSERT INTO `query_statementa` VALUES (13, 0, NULL, 'operation4DataRootPath', b'0', 'list', '[max, offset]', 'from DataRootPath dataRootPath', 'DataRootPath', 'listDataRootPath');
INSERT INTO `query_statementa` VALUES (14, 0, NULL, 'operation4DataRootPath', b'0', 'count', '[]', 'select count(*) from DataRootPath dataRootPath', 'DataRootPath', NULL);
INSERT INTO `query_statementa` VALUES (15, 0, NULL, 'home', b'0', 'count', '[]', NULL, '进度', NULL);
INSERT INTO `query_statementa` VALUES (16, 0, NULL, 'home', b'0', 'list', '[max, offset]', NULL, '进度', NULL);
INSERT INTO `query_statementa` VALUES (17, 0, NULL, 'home', b'0', 'list', '[max, offset]', NULL, '近7天登录', NULL);
INSERT INTO `query_statementa` VALUES (18, 0, NULL, 'home', b'0', 'count', '[]', NULL, '近7天登录', NULL);
INSERT INTO `query_statementa` VALUES (19, 0, NULL, 'home', b'0', 'list', '[max, offset]', NULL, '完成度', NULL);
INSERT INTO `query_statementa` VALUES (20, 0, NULL, 'home', b'0', 'count', '[]', NULL, '完成度', NULL);

SET FOREIGN_KEY_CHECKS = 1;
