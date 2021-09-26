CREATE TABLE `users`(
    `id` int(11) NOT NULL PRIMARY KEY,
    `username` varchar(52) NOT NULL,
    `password` varchar(52) NOT NULL,
)ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE `conversations`(
    `id` TEXT NOT NULL,
    `sender` TEXT NOT NULL,
    `receiver` TEXT NOT NULL,
)ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `messages`(
    `id` int(11) NOT NULL PRIMARY KEY,
    `sender` varchar(52) NOT NULL,
    `text` TEXT NOT NULL,
    `date` datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE `messages`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;