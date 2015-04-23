FROM ubuntu:14.04

RUN apt-get update

# Install pip's dependdency: setuptools:
RUN apt-get install -y python \
                       python-pip \
                       python-dev \
                       python-distribute \
                       git \
                       vim \
                       wget \
                       tar

RUN apt-get clean all

# Download and install Flask framework:
RUN pip install flask

EXPOSE 5000

CMD ["python"]
