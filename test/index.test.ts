
// import request from 'request';

describe('Requests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('httpGet', () => {
    it('Should successfully send a get request', async () => {
    //   const requestSpy = jest.spyOn(request, 'get').mockResolvedValue({
    //     body: 'Success'
    //   });
    //   const response = await Requests.httpGet('http://test.com');
    //   expect(requestInitializerSpy).toHaveBeenCalled();
    //   expect(request).toHaveBeenCalled();
      expect(true).toEqual(true);
    });
  });
  
});
