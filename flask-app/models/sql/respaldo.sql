-- MySQL dump 10.13  Distrib 5.7.35, for Linux (x86_64)
--
-- Host: localhost    Database: recursos
-- ------------------------------------------------------
-- Server version	5.7.35-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `evento`
--
USE recursos;

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `evento_id` varchar(60) NOT NULL,
  `recurso_id` varchar(60) NOT NULL,
  `resourceId` varchar(60) NOT NULL,
  `title` varchar(100) NOT NULL,
  `start` varchar(60) NOT NULL,
  `end` varchar(60) NOT NULL,
  PRIMARY KEY (`evento_id`),
  UNIQUE KEY `evento_id` (`evento_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evento`
--
USE recursos;

DROP TABLE IF EXISTS `licencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `licencia` (
  `licencia_id` varchar(60) NOT NULL,
  `start` varchar(60) NOT NULL,
  `end` varchar(60) NOT NULL,
  PRIMARY KEY (`licencia_id`),
  UNIQUE KEY `licencia_id` (`licencia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `local`
--

DROP TABLE IF EXISTS `local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `local` (
  `local_id` varchar(60) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `daysOfWeek` INT NOT NULL,
  `startTime` varchar(100) NOT NULL,
  `endTime` varchar(100) NOT NULL,
  `turno` varchar(100) NOT NULL,
  PRIMARY KEY (`local_id`),
  UNIQUE KEY `local_id` (`local_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local`
--

/*LOCK TABLES `local` WRITE;
/*!40000 ALTER TABLE `local` DISABLE KEYS */;
/*INSERT INTO `local` VALUES ('1','RONDEAU','Central','rondeau@normisur.uy'),('15','MVD 1','Montevideo Shopping','montevideo1@normisur.uy'),('21','SAYAGO','Devoto Sayago','SAYAGO@NORMISUR.UY'),('22','TRES CRUCES 1','Tres Cruces','trescruces1@normisur.uy'),('23','PORTONES','Portones Shopping','portones@normisur.uy'),('24','MERCEDES','Mercedes','mercedes@normisur.uy'),('26','COLONIA','Colonia','colonia@normisur.uy'),('27','SALTO','Salto','salto@normisur.uy'),('3','WEB','Central','sofia@normisur.uy'),('30','MVD 2','Montevideo Shopping','montevideo2@normisur.uy'),('31','COSTA 1','Costa Urbana Shopping','costa1@normisur.uy'),('32','COSTA 2','Costa Urbana Shopping','costa2@normisur.uy'),('33','PUNTA DEL ESTE 2','Punta del este Shopping','puntadeleste2@normisur.uy'),('35','TRES CRUCES 2','Tres Cruces Shopping','trescruces2@normisur.uy'),('36','NUEVOCENTRO','Nuevocentro Shopping','nuevocentro@normisur.uy'),('37','PUNTA DEL ESTE 1','Punta del este Shopping','puntadeleste1@normisur.uy'),('40','MVDEO ACC','Montevideo Shopping','montevideoacc@normisur.uy'),('41','NUEVOCENTRO ACC','Nuevocentro Shopping','nuevocentroacc@normisur.uy'),('42','PAYSANDU','Paysandy Shopping','paysandu@normisur.uy'),('43','LAS PIEDRAS','Las Piedras Shopping','laspiedras@normisur.uy'),('45','PORTONES 1','Portones Shopping','portones1@normisur.uy'),('46','OCA','Oca Metros','metraje@normisur.uy');
/*!40000 ALTER TABLE `local` ENABLE KEYS */;
/*UNLOCK TABLES;*/

--
-- Table structure for table `recurso`
--

DROP TABLE IF EXISTS `recurso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recurso` (
  `recurso_id` varchar(60) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  PRIMARY KEY (`recurso_id`),
  UNIQUE KEY `recurso_id` (`recurso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recurso`
--

LOCK TABLES `recurso` WRITE;
/*!40000 ALTER TABLE `recurso` DISABLE KEYS */;
INSERT INTO `recurso` VALUES ('1','Matias','Zappino');
/*!40000 ALTER TABLE `recurso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship_el`
--

DROP TABLE IF EXISTS `relationship_el`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationship_el` (
  `evento_id` varchar(60) NOT NULL,
  `local_id` varchar(60) NOT NULL,
  KEY `evento_id` (`evento_id`),
  KEY `local_id` (`local_id`),
  CONSTRAINT `relationship_el_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`evento_id`),
  CONSTRAINT `relationship_el_ibfk_2` FOREIGN KEY (`local_id`) REFERENCES `local` (`local_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship_el`
--

LOCK TABLES `relationship_el` WRITE;
/*!40000 ALTER TABLE `relationship_el` DISABLE KEYS */;
/*!40000 ALTER TABLE `relationship_el` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship_re`
--

DROP TABLE IF EXISTS `relationship_re`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationship_re` (
  `recurso_id` varchar(60) NOT NULL,
  `evento_id` varchar(60) NOT NULL,
  KEY `recurso_id` (`recurso_id`),
  KEY `evento_id` (`evento_id`),
  CONSTRAINT `relationship_re_ibfk_1` FOREIGN KEY (`recurso_id`) REFERENCES `recurso` (`recurso_id`),
  CONSTRAINT `relationship_re_ibfk_2` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`evento_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `relationship_lr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationship_lr` (
  `licencia_id` varchar(60) NOT NULL,
  `recurso_id` varchar(60) NOT NULL,
  KEY `licencia_id` (`licencia_id`),
  KEY `recurso_id` (`recurso_id`),
  CONSTRAINT `relationship_lr_ibfk_1` FOREIGN KEY (`licencia_id`) REFERENCES `licencia` (`licencia_id`),
  CONSTRAINT `relationship_lr_ibfk_2` FOREIGN KEY (`recurso_id`) REFERENCES `recurso` (`recurso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-09 15:25:48
