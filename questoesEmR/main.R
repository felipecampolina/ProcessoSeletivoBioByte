# Função para importar a base de dados IRIS
importar_iris <- function(url) {
  iris <- read.csv(url, header=FALSE)
  colnames(iris) <- c("Comprimento_Sepala", "Largura_Sepala", "Comprimento_Petala", "Largura_Petala", "Especie")
  return(iris)
}

# Função para sumarizar a base identificando os valores máximos, mínimos, média e mediana de cada atributo da base
sumarizar_base <- function(iris) {
  estatisticas_resumo <- sapply(iris[,1:4], function(x) c(min = min(x), max = max(x), media = mean(x), mediana = median(x)))
  print(estatisticas_resumo)
}

# Função para analisar a base de dados IRIS
analisar_iris <- function(iris) {
  # Quantidade de atributos e registros da base
  print("Quantidade de atributos:")
  print(ncol(iris))
  print("Quantidade de registros:")
  print(nrow(iris))
  
  # Tipos de atributos da base de dados
  print("Tipos de atributos:")
  print(sapply(iris, class))
  
  # Sumarize a base identificando os valores máximos, mínimos, média e mediana de cada atributo da base.
  sumarizar_base(iris)
  
  # Transformar o tipo do atributo que contém informações sobre as espécies da Íris em fator
  iris$Especie <- as.factor(iris$Especie)
  
  # Identificar quantos registros existem para cada espécie de Íris
  table(iris$Especie)
}

# Função para adicionar novo registro ao dataframe de IRIS
adicionar_novo_registro <- function(iris) {
  media_linha <- colMeans(iris[,1:4], na.rm = TRUE)
  media_linha["Especie"] <- NA
  iris <- rbind(iris, media_linha)
  return(iris)
}

# Função para adicionar nova coluna numérica ao dataframe de IRIS
adicionar_coluna_numerica <- function(iris) {
  iris$Especie_numerica <- NA
  iris$Especie_numerica[iris$Especie == "Iris-setosa"] <- 1
  iris$Especie_numerica[iris$Especie == "Iris-versicolor"] <- 2
  iris$Especie_numerica[iris$Especie == "Iris-virginica"] <- 3
  return(iris)
}

# Função para plotar gráfico de barras da Questão 5
plotar_grafico_barras <- function(iris) {
  cores <- c("red", "green", "blue")
  barplot(table(iris$Especie), main = "Quantidade de registros de cada espécie", xlab = "Espécie", ylab = "Quantidade", col = cores, legend = TRUE)
}

# Função para plotar gráfico de pizza da Questão 6
plotar_grafico_pizza <- function(iris) {
  quantidades <- table(iris$Especie)
  porcentagens <- round(100 * quantidades / sum(quantidades), 1)
  etiquetas <- paste(names(quantidades), "\n", porcentagens, "%", sep = "")
  pie(quantidades, main = "Quantidade de registros de cada espécie", col = rainbow(length(quantidades)), labels = etiquetas)
  legend("topright", legend = names(quantidades), fill = rainbow(length(quantidades)))
}

# Questão 1
url <- "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"
iris <- importar_iris(url)

# Questão 2
analisar_iris(iris)

# Questão 3
iris <- adicionar_novo_registro(iris)

# Questão 4
iris <- adicionar_coluna_numerica(iris)

# Questão 5
plotar_grafico_barras(iris)

# Questão 6
plotar_grafico_pizza(iris)
