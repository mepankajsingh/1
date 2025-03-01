import { useRouteError, isRouteErrorResponse, Link } from "@remix-run/react";
import { Title, Text, Button, Container, Group } from '@mantine/core';

export default function ErrorBoundary() {
  const error = useRouteError();
  
  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again later.";
  
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page not found";
      message = "The page you are looking for doesn't exist or has been moved.";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You must be logged in to view this page.";
    } else if (error.status === 403) {
      title = "Forbidden";
      message = "You don't have permission to access this resource.";
    }
  }
  
  return (
    <Container size="md" py={80}>
      <Title ta="center" order={1}>{title}</Title>
      <Text c="dimmed" size="lg" ta="center" mt="md">
        {message}
      </Text>
      <Group justify="center" mt="xl">
        <Button component={Link} to="/" size="md">
          Back to Home
        </Button>
      </Group>
    </Container>
  );
}
