FROM openjdk:8
VOLUME /tmp

LABEL mainteiner="raul"

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update -qqy && apt-get -qqyy install \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 5858 9229

WORKDIR /usr/app/
ARG frontend=accessGatewayManager
ARG backend=accessGatewayManagerBackend

COPY ./${frontend} ./${frontend}
COPY ./${backend} ./${backend}

WORKDIR /usr/app/${frontend}
RUN npm i --silent
ENV PATH /usr/app/${frontend}/node_modules/.bin:$PATH
RUN npm run build:prod

WORKDIR /usr/app/${backend}
RUN ./gradlew stage --stacktrace

WORKDIR /usr/app/

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./accessGatewayManagerBackend/build/libs/accessGatewayManager-0.0.1-SNAPSHOT.jar"]