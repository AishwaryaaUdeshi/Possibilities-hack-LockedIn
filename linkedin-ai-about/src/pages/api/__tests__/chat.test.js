import handler from '../chat';

describe('Chat API', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: 'POST',
      body: {
        message: '',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  it('handles role question', async () => {
    req.body.message = "What's your role?";
    await handler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      reply: 'I am currently a SDE Intern @ Amazon | Math + CS @ Columbia.',
    });
  });

  it('handles name question', async () => {
    req.body.message = 'What is your name?';
    await handler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      reply: 'My name is Kenny.',
    });
  });

  it('handles university question', async () => {
    req.body.message = 'Where do you go to school?';
    await handler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      reply: 'I attend Columbia University.',
    });
  });

  it('handles interests question', async () => {
    req.body.message = 'What are your interests?';
    await handler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      reply: "I'm interested in education, climate change, artificial intelligence, quantitative finance.",
    });
  });

  it('handles mentorship match', async () => {
    req.body.message = 'I am interested in technology and growth';
    await handler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      reply: "I'm interested in education, climate change, artificial intelligence, quantitative finance.",
    });
  });

  it('handles invalid request method', async () => {
    req.method = 'GET';
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
  });

  it('handles missing message', async () => {
    delete req.body.message;
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Message is required' });
  });
}); 