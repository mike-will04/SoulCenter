-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para node
DROP DATABASE IF EXISTS `node`;
CREATE DATABASE IF NOT EXISTS `node` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `node`;

-- Copiando estrutura para tabela node.jogo
CREATE TABLE IF NOT EXISTS `jogo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `lancamento` varchar(255) DEFAULT NULL,
  `resumo` varchar(1000) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela node.jogo: ~6 rows (aproximadamente)
INSERT INTO `jogo` (`id`, `nome`, `genero`, `lancamento`, `resumo`, `imagem`) VALUES
	(4, 'Bloodborne', 'RPG de ação', '24 de março de 2015', 'Desenvolvido pela FromSoftware, Bloodborne é um RPG de ação focado em combates rápidos e mecânicas de risco e recompensa. Ambientado em uma cidade gótica infestada de criaturas, o jogo é conhecido por sua atmosfera sombria e design de mundo intrincado.', '1732314143491-imagem_2024-11-22_192223011.png'),
	(5, 'Fire Emblem: Awakening', 'RPG de estratégia', '19 de abril de 2012 (Japão)', 'Desenvolvido pela Intelligent Systems, Fire Emblem: Awakening revitalizou a série com sua história envolvente e mecânicas de combate estratégicas, além de permitir relacionamentos entre personagens.', '1732314160814-imagem_2024-11-22_192230008.png'),
	(6, 'XCOM: Enemy Unknown', 'RPG de estratégia', '9 de outubro de 2012', 'Desenvolvido pela Firaxis Games, XCOM: Enemy Unknown é um jogo de estratégia em que os jogadores comandam uma força militar global contra uma invasão alienígena. É conhecido por sua dificuldade e decisões táticas.', '1732314178186-imagem_2024-11-22_192246361.png'),
	(7, 'Monster Hunter Generations', 'RPG de ação', '15 de julho de 2016', 'Desenvolvido pela Capcom, Monster Hunter Generations foca em caçar monstros em diferentes regiões. Oferece diversas armas e habilidades, com missões cooperativas para vários jogadores.', '1732314195180-imagem_2024-11-22_192302713.png'),
	(8, 'World of Warcraft (WoW)', 'MMORPG', '23 de novembro de 2004', 'Desenvolvido pela Blizzard Entertainment, WoW é um dos MMORPGs mais influentes de todos os tempos. Os jogadores criam personagens em diferentes raças e classes, exploram um vasto mundo de fantasia, completam missões, participam de batalhas PvE e PvP e se envolvem em um enredo rico que se expande em várias expansões.', '1732314353558-imagem_2024-11-22_192553025.png'),
	(9, ' Final Fantasy XIV (FF XIV)', 'MMORPG', '30 de setembro de 2010 (original) / 27 de agosto de 2013 (A Realm Reborn)', 'Publicado pela Square Enix, FF XIV teve um início conturbado, mas foi relançado com sucesso como "A Realm Reborn". O jogo oferece uma narrativa complexa, combate estratégico e um mundo vasto com influências clássicas da série Final Fantasy.', '1732314371411-imagem_2024-11-22_192610912.png'),
	(10, 'Lost Ark', 'MMORPG/ARPG', '4 de dezembro de 2019 (Coreia do Sul) / 11 de fevereiro de 2022 (internacional)', 'Desenvolvido pela Smilegate RPG, Lost Ark combina elementos de RPG de ação com mecânicas de MMORPG. Ele é conhecido por suas batalhas dinâmicas, gráficos impressionantes e uma variedade de classes com habilidades únicas.', '1732314396181-imagem_2024-11-22_192631379.png'),
	(11, ' RuneScape', 'MMORPG', '4 de janeiro de 2001', 'Criado pela Jagex, RuneScape é um dos MMORPGs mais duradouros e populares, com um mundo aberto onde os jogadores podem realizar missões, treinar habilidades, participar de atividades sociais e explorar uma economia controlada pelos próprios jogadores.', '1732314415942-imagem_2024-11-22_192655441.png'),
	(12, 'Tibia', 'MMORPG', '7 de janeiro de 1997', 'Desenvolvido pela CipSoft, Tibia é um dos primeiros MMORPGs e ainda mantém uma base de jogadores leal. O jogo é conhecido por seu estilo retro, jogabilidade hardcore com penalidades severas por morte e uma comunidade engajada.', '1732314431229-imagem_2024-11-22_192710644.png'),
	(13, 'The Elder Scrolls V: Skyrim', 'RPG de ação', '11 de novembro de 2011', 'Desenvolvido pela Bethesda Game Studios, Skyrim é famoso por seu mundo aberto expansivo e liberdade de exploração. Os jogadores assumem o papel do Dragonborn em uma jornada para derrotar Alduin, um dragão profetizado para destruir o mundo.', '1732314509632-imagem_2024-11-22_192829117.png'),
	(14, 'Chrono Trigger', 'RPG', '11 de março de 1995', 'Lançado pela Square (agora Square Enix), Chrono Trigger é um clássico aclamado que introduziu viagens no tempo como parte de sua narrativa, além de um sistema de batalha inovador e múltiplos finais.', '1732314529736-imagem_2024-11-22_192849101.png'),
	(15, 'Diablo III', 'RPG de ação/Hack and Slash', '15 de maio de 2012', 'Desenvolvido pela Blizzard Entertainment, Diablo III continua a série com foco em combates rápidos e coleta de itens. Os jogadores enfrentam hordas de inimigos em sua missão para derrotar o demônio Diablo.', '1732314554060-imagem_2024-11-22_192913524.png'),
	(16, 'Baldur\'s Gate III', 'RPG', '3 de agosto de 2023 (versão completa)', 'Criado pela Larian Studios, Baldur\'s Gate III é um RPG que se baseia no sistema de Dungeons & Dragons. O jogo é aclamado por sua narrativa profunda, liberdade de escolhas e mecânicas de combate por turnos.', '1732314573603-imagem_2024-11-22_192932642.png'),
	(17, 'Pokémon (série)', 'RPG', '27 de fevereiro de 1996 (primeiro jogo)', 'A série Pokémon, desenvolvida pela Game Freak, envolve capturar e treinar criaturas conhecidas como Pokémon para batalhar contra outros treinadores. É uma das franquias de mídia mais bem-sucedidas do mundo.', '1732314588913-imagem_2024-11-22_192948473.png'),
	(18, 'Fallout: New Vegas', 'RPG de ação', '19 de outubro de 2010', 'Desenvolvido pela Obsidian Entertainment, Fallout: New Vegas é um RPG ambientado em um cenário pós-apocalíptico. O jogo é elogiado por suas escolhas narrativas complexas e liberdade de exploração.', '1732314613951-imagem_2024-11-22_193013399.png'),
	(19, 'Persona (série)', 'RPG de ação', '20 de setembro de 1996 (primeiro jogo)', 'Desenvolvida pela Atlus, a série Persona combina elementos de vida escolar com batalhas contra entidades sobrenaturais. É famosa por suas histórias envolventes e mecânicas de gerenciamento de tempo.', '1732314635761-imagem_2024-11-22_193035230.png'),
	(20, 'Undertale', 'RPG de ação', '15 de setembro de 2015', 'Criado por Toby Fox, Undertale é um RPG indie aclamado que permite aos jogadores decidir entre lutar ou poupar seus inimigos, levando a múltiplos finais e interações únicas com os personagens.', '1732314650655-imagem_2024-11-22_193050157.png'),
	(21, 'Earthbound', 'RPG de ação', '27 de agosto de 1994 (Japão)', 'Desenvolvido pela HAL Laboratory, Earthbound segue a história de Ness e seus amigos em uma jornada para salvar o mundo de uma entidade maligna. O jogo é conhecido por seu humor peculiar e narrativa única.', '1732314672367-imagem_2024-11-22_193111742.png'),
	(22, 'Dark Souls III', 'RPG de ação', '24 de março de 2016', 'Desenvolvido pela FromSoftware, Dark Souls III é conhecido por sua jogabilidade desafiadora, lore enigmático e combates intensos. É aclamado por seu design de mundo interconectado e ambientação sombria.', '1732314704461-imagem_2024-11-22_193144005.png'),
	(23, 'The Legend of Zelda: Breath of the Wild', 'RPG de ação/Aventura', '3 de março de 2017', 'Desenvolvido pela Nintendo, é um dos jogos mais revolucionários da série, oferecendo um vasto mundo aberto e a liberdade de resolver problemas de várias maneiras. É conhecido por redefinir o gênero de mundo aberto.', '1732393611613-zelda.jpg'),
	(24, 'Castlevania: Symphony of the Night', 'RPG de ação/Metroidvania', '20 de março de 1997', 'Este título da Konami é considerado um dos melhores exemplos de Metroidvania, combinando exploração, combate dinâmico e elementos de RPG em um castelo cheio de segredos e monstros.', '1732393709488-castlevania.png');

-- Copiando estrutura para tabela node.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `admin` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela node.usuario: ~1 rows (aproximadamente)
INSERT INTO `usuario` (`id`, `usuario`, `email`, `senha`, `admin`) VALUES
	(8, 'SoulCenterAdmin', 'soulcenter@gmail.com', '$2b$10$bxmoyKB/mOPvQ2qsfRGiTeTeARtoiGoWaL7hRyIo0Xd9k8LJ0Tq2m', '1');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
