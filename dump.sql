-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: ecom
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` double DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  KEY `FKiuhn9mru62vgqy1h0t1ggc3s7` (`order_id`),
  KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`),
  CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKiuhn9mru62vgqy1h0t1ggc3s7` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,47920,100,NULL,1,1),(2,47920,100,NULL,2,1),(3,6200,100,NULL,2,5),(4,31320,200,NULL,2,3),(5,8100,200,NULL,3,4),(6,21330,300,NULL,3,6),(11,47920,100,NULL,6,1),(14,26100,150,NULL,6,3);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_64t7ox312pqal3p7fg9o503c2` (`user_id`),
  CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (5,5),(6,6),(10,10),(12,12);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_price` decimal(38,2) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2024-05-09 07:28:25.000000','Cancelled',47920.00,5),(2,'2024-05-09 08:11:21.000000','pending',85440.00,5),(3,'2024-05-09 08:17:43.000000','pending',29430.00,10),(5,'2024-05-09 09:11:34.000000','Cancelled',0.00,5),(6,'2024-05-09 10:00:47.000000','Cancelled',74020.00,12);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `base_price` decimal(38,2) DEFAULT NULL,
  `category` tinyint DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `reduction` double DEFAULT NULL,
  `threshold` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,599.00,0,'INTEL Core i3 10105F 3.7GHz (4.4GHz Max Boost) CPU Processor | 500GB SSD – Up to 30x Faster Than Traditional HDD','../../img/817k+YYSl8L._AC_SX466_.jpg','Skytech Gaming Chronos Mini Gaming PC Desktop',900,0.1,50),(2,699.00,0,'Intel I7-9750H 6 Cores 12 Threads Processors, Nvidia GTX 1050 3G Mini PC, 32GB RAM 1TB SSD RGB Light Mini Desktop Computer, Support RJ45/2.4G/5.0G WiFi 5/HDMI Windows 11 Pro','../../img/61vp92PZQcL.__AC_SX300_SY300_QL70_FMwebp_.webp','FUNYET Mini Gaming PC',700,0.2,100),(3,174.00,1,'Epaulettes, Gun Patch, Straps, Belt, Back Saddle, Wedge Back, Through Pockets, D Rings And Hand Finished Collar\n46 Inches Long - All Pockets Are Usable And Can Be Opened\nMaterial Is Water Resistant','../../img/71T2chafU8L._AC_SY741_.jpg','The Platinum Tailor Mens Traditional Double Breasted Long Trench Coat',1800,0.1,200),(4,45.00,1,'Size Guide: S=US 4-6, M=US 8-10，L=US 12-14，XL=US 16-18 Dressing Tips: It will be perfect to pair the light-colored dress with light-colored underwear.And It runs a little big so please size down if you are between sizes','../../img/71CpElHM+FL._AC_SX679_.jpg','PRETTYGARDEN Women\'s 2024 Casual Loose Plain Maxi Sundress',2800,0.1,200),(5,62.00,2,'A dazzling new edition of J.K. Rowling\'s Harry Potter and the Sorcerer\'s Stone, fully illustrated in brilliant color and featuring exclusive interactive paper craft elements, including a foldout Hogwarts letter and more!','../../img/91pI+R+GE7L._SY466_.jpg','Harry Potter and the Sorcerer\'s Stone',4900,0.2,500),(6,79.00,2,'This unique book is written by Dr. Nicole Apelian - an herbalist with over 20 years of experience working with plants, and Claude Davis, a wild west expert passionate about the lost remedies and wild edibles that kept previous generations alive.','../../img/71++zre30EL._SY466_.jpg','The Lost Book of Herbal Remedies',4700,0.1,200),(7,579.00,3,'Automated blending: five pre-programmed settings ensure simple cleaning, walk-away convenience, and consistent results for smoothie, frozen dessert, Soup, and purée recipes.','../../img/710oTXr5u+L._AC_SY300_SX300_.jpg','Vitamix, Pearl Grey, Series 750 Blender',2000,0.1,200),(8,125.00,3,'TIME & TEMP. CONTROL: Precise timer and temperature adjusting knobs with clear scale of 0~5 minutes and 50~300℃. LED light indicates heating status. Clear and melodious alarm when waffle is ready, no need to wait beside any longer.','../../img/71OZa07MPgL._SX522_.jpg','VEVOR Commercial Round Waffle Maker',3000,0.2,200),(9,55.00,4,'16 Gym Accessories.20 in 1 Push Up Board Fitness,Resistance Bands with Ab Roller Wheel,Home Workout for Men','../../img/71HnZfLaE+L._AC_SX679_.jpg','HOTWAVE Portable Exercise Equipment ',6000,0.1,500),(10,48.00,4,'UPGRADE STRUCTURE DESIGN - The weight plate of the TOTOZAKUL upgrade adjustable dumbbells set adopts an octagonal design, which prevents rolling, is safe and stable, and is easy to store.','../../img/61OnJ47-hvL.__AC_SX300_SY300_QL70_FMwebp_.webp','Adjustable Weights Dumbbells Set',7000,0.1,500),(11,9.00,5,'❣️Made from Latex free makeup blender sponge.\n❣️Makeup sponges for BB cream, cosmetic foundation, concealer, powder, liquid, and etc.\n❣️Super Soft feeling wonder blender.','../../img/41sX+hKcbML._SY300_SX300_.jpg','AOA Studio Collection makeup Sponge Set ',10000,0.1,1000),(12,16.00,5,'Ginseng and Retinol Synergy: Experience the power of ginseng and retinol working in perfect harmony. This serum is a tribute to age-old Korean beauty wisdom, bringing you the best of nature\'s rejuvenating elements.','../../img/31ZNIWikbtL._SX300_SY300_QL70_FMwebp_.webp','Beauty of Joseon Revive Eye Serum',10000,0.2,1000),(13,30.00,6,'Gravy Lovers Poultry and Beef Gourmet Wet Cat Food Variety Pack - (Pack of 30) 3 oz. Cans','../../img/8126vmXXwkL.__AC_SX300_SY300_QL70_FMwebp_.webp','Purina Fancy Feast',20000,0.1,1000),(14,100.00,6,'Pasture-raised Beef, Water, Contains 2% or Less of the Following: Onion, Garlic, Mustard, Paprika, Celery Powder, Vinegar, Salt, Sugar, Extractives of Paprika, Allspice, Coriander, Nutmeg, Red Pepper, Rosemary.','../../img/410ceAD2u1L._SX300_SY300_QL70_FMwebp_.webp','Fork In The Road Foods, Honest Dogs, 12 Ounce',10000,0.2,1000),(15,32.00,7,'NQGOPPH Magnetic Tiles Set:120PCS including 96 basic shapes, 2 car bases, and 4 click-ins. Hours of creative play and STEM learning.','../../img/81IWNDAX+OL._AC_SY300_SX300_.jpg','NQGOPPH Mangetic Tilesx',20000,0.1,500),(16,17.00,7,'The dancing cactus adds a volume adjustment function for different scenes.','../../img/710--rtKe7L._AC_SX679_.jpg','Pbooo Dancing Cactus Mimicking Toy',4000,0.1,600),(17,159.00,8,'Low battery where is power outlet? 2 Standard Plug Outlets & 2 USB Ports on the top of the rattan nightstand, and it comes with a 6.5 ft long power cord.','../../img/81ceQPWpfUL.__AC_SX300_SY300_QL70_FMwebp_.webp','DMIDYLL Rattan Nightstands Set',2000,0.2,200),(18,29.00,8,'Large Capacity yet Space Saving -- This 10 tier narrow shoe rack is ideal for small space. ','../../img/61jiYKWngZL.__AC_SX300_SY300_QL70_FMwebp_.webp','VTRIN Narrow Shoe Rack',5000,0.2,500),(19,129.00,9,'💖UNIQUE GIFTS: Best jewelry gifts for her, wife, girlfriend, mom, daughter, friends...','../../img/71bZO0gpLVL._AC_SY675_.jpg','Iefil Mothers Day Gifts',2000,0.1,200),(20,600.00,9,'Infinite Love:A wide variety of dainty Earrings,Necklace,Rings , no duplicate styles, super practical! You can wear different links no matter what the occasion, as you wish, having what you need.','../../img/71qw62QTSDL._AC_SY675_.jpg','CONGYING 46 Pcs Gold Jewelry Set',1000,0.1,100);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_pnp1baae4enifkkuq2cd01r9l` (`cart_id`),
  CONSTRAINT `FKdv26y3bb4vdmsr89c9ppnx85w` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'test home','2024-05-03','test@test.com','ftest','ltest','$2a$10$aFeyvAfh2mwR/TYyNjVirO7/ChBaNu9X.Qa03eJq5KXNeLhJRrjtC',1,'1234567890','test',5),(6,'admail lair','2024-05-03','admin@admin.com','fadmin','ladmin','$2a$10$O7kMbKTMv.5VAi1vGjHLpeuMHbBrmolEt1P9Wpi9GgUZaUVJJ6NwO',0,'0123456789','admin',6),(10,'adam\' home','2024-05-09','adam@gmail.com','adam','sandler','$2a$10$IgltBJkeii9cmSWunvWn4ufgAx.E/Kdn7iIS0/go7K7txWiRFCOYq',1,'1234567890','user',10),(12,'charaf','2024-05-09','mahdybaakrim@gmail.com','mahdy','baakrim','$2a$10$UFhqPEUdmms8q4twbM1NGe3YE7o6yqQFR03rOYkhHGIZINzVL.JLK',1,'6012345678','midnight',12);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-13 20:19:40
